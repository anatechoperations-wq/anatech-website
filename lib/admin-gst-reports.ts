import "server-only";

import { google } from "googleapis";
import { getMasterSettings } from "@/lib/admin-master-settings";
import { getCreditNoteTotals } from "@/lib/admin-credit-notes";
import type { GstComplianceReport, GstRegisterRow } from "@/lib/gst-types";

const SHEET_NAME = "CRM Documents";

function getAuth() {
  return new google.auth.GoogleAuth({
    credentials: {
      project_id: process.env.GOOGLE_PROJECT_ID,
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

function validNumber(value: unknown) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function defaultPeriod() {
  return new Date().toISOString().slice(0, 7);
}

export async function getGstComplianceReport(period = defaultPeriod()): Promise<GstComplianceReport> {
  const report: GstComplianceReport = {
    period,
    rows: [],
    totalTaxableValue: 0,
    totalCgst: 0,
    totalKgst: 0,
    totalIgst: 0,
    totalTax: 0,
    totalInvoiceValue: 0,
    b2bCount: 0,
    b2cCount: 0,
    incompleteRows: 0,
    companyGstinConfigured: false,
    filingReadiness: [],
    creditNotes: { taxable: 0, cgst: 0, kgst: 0, igst: 0, total: 0, count: 0 },
    netTaxableValue: 0,
    netTax: 0,
    netInvoiceValue: 0,
  };

  const settings = await getMasterSettings();
  report.companyGstinConfigured = settings.gstin.length === 15;

  if (!process.env.GOOGLE_SHEET_ID || !process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
    report.filingReadiness.push("Google Sheets CRM connection is not configured.");
    return report;
  }

  try {
    const sheets = google.sheets({ version: "v4", auth: getAuth() });
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      fields: "sheets.properties",
    });
    if (!spreadsheet.data.sheets?.some((sheet) => sheet.properties?.title === SHEET_NAME)) {
      report.filingReadiness.push("No saved CRM invoices are available yet.");
      return report;
    }

    const values = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "'" + SHEET_NAME + "'!A2:P",
    });

    report.rows = (values.data.values ?? [])
      .filter((row) => String(row[1] ?? "") === "Invoice" && String(row[0] ?? "").slice(0, 7) === period)
      .map((row) => {
        const customerGstin = String(row[3] ?? "").trim().toUpperCase();
        const rowData: GstRegisterRow = {
          date: String(row[0] ?? ""),
          reference: String(row[13] ?? ""),
          customer: String(row[2] ?? ""),
          customerGstin,
          placeOfSupply: String(row[4] ?? ""),
          supplyType: String(row[5] ?? ""),
          taxableValue: validNumber(row[6]),
          taxRate: validNumber(row[7]),
          cgst: validNumber(row[8]),
          kgst: validNumber(row[9]),
          igst: validNumber(row[10]),
          total: validNumber(row[11]),
          lines: (() => { try { const parsed = JSON.parse(String(row[12] ?? "[]")); return Array.isArray(parsed) ? parsed : []; } catch { return []; } })(),
          category: customerGstin.length === 15 ? "B2B" : "B2C",
        };
        const incomplete = !rowData.reference || !rowData.customer || !rowData.placeOfSupply ||
          !rowData.supplyType || !rowData.lines.length || rowData.lines.some((line) => !line.hsnSac || !line.unit) || rowData.taxableValue < 0 || (customerGstin.length > 0 && customerGstin.length !== 15);
        if (incomplete) report.incompleteRows += 1;
        return rowData;
      });

    for (const row of report.rows) {
      report.totalTaxableValue += row.taxableValue;
      report.totalCgst += row.cgst;
      report.totalKgst += row.kgst;
      report.totalIgst += row.igst;
      report.totalInvoiceValue += row.total;
      if (row.category === "B2B") report.b2bCount += 1; else report.b2cCount += 1;
    }
    report.totalTax = report.totalCgst + report.totalKgst + report.totalIgst;
    report.creditNotes = await getCreditNoteTotals(period);
    report.netTaxableValue = report.totalTaxableValue - report.creditNotes.taxable;
    report.netTax = report.totalTax - report.creditNotes.cgst - report.creditNotes.kgst - report.creditNotes.igst;
    report.netInvoiceValue = report.totalInvoiceValue - report.creditNotes.total;

    if (!report.companyGstinConfigured) report.filingReadiness.push("Add the verified 15-character company GSTIN in Master Settings.");
    if (report.incompleteRows) report.filingReadiness.push(report.incompleteRows + " invoice record(s) need review before filing.");
    if (report.rows.length === 0) report.filingReadiness.push("No structured CRM invoices were found for this month.");
    report.filingReadiness.push("This is a review register. Verify HSN/SAC, supply classification, amendments, credit/debit notes and tax treatment with your CA before filing.");
  } catch (error) {
    console.error("Unable to prepare GST compliance report.", error);
    report.filingReadiness.push("The compliance register could not read the CRM invoice data.");
  }
  return report;
}

function csvCell(value: string | number) {
  return '"' + String(value).replace(/"/g, '""') + '"';
}

export function gstReportCsv(report: GstComplianceReport) {
  const header = ["Invoice date", "Reference", "Customer", "Customer GSTIN", "Category", "Place of supply", "Supply type", "Taxable value", "GST rate", "CGST", "KGST", "IGST", "Invoice total"];
  const lines = report.rows.map((row) => [
    row.date, row.reference, row.customer, row.customerGstin, row.category, row.placeOfSupply, row.supplyType,
    row.taxableValue, row.taxRate, row.cgst, row.kgst, row.igst, row.total,
  ].map(csvCell).join(","));
  return [header.map(csvCell).join(","), ...lines].join("\n");
}
