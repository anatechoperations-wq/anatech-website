import "server-only";

import { google } from "googleapis";
import { calculateTaxBreakup, getMasterSettings, type MasterSettings } from "@/lib/admin-master-settings";

export type CrmDocumentType = "Quotation" | "Invoice";

export type CrmDocumentInput = {
  type: CrmDocumentType;
  customer: string;
  customerGstin: string;
  placeOfSupplyCode: string;
  taxRate: number;
  lines: Array<{ description: string; quantity: number; rate: number; hsnSac: string; unit: string; }>;
};

export type DocumentCalculation = ReturnType<typeof calculateTaxBreakup>;

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

async function ensureDocumentSheet() {
  if (!process.env.GOOGLE_SHEET_ID) throw new Error("GOOGLE_SHEET_ID is missing.");

  const sheets = google.sheets({ version: "v4", auth: getAuth() });
  const spreadsheet = await sheets.spreadsheets.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    fields: "sheets.properties",
  });
  const exists = spreadsheet.data.sheets?.some((sheet) => sheet.properties?.title === SHEET_NAME);
  const headers = [
    "Created at", "Document type", "Customer", "Customer GSTIN", "Place of supply",
    "Supply type", "Subtotal", "GST rate", "CGST", "KGST", "IGST", "Total",
    "Line items", "Document reference", "Payment terms", "Seller GSTIN",
  ];

  if (!exists) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      requestBody: { requests: [{ addSheet: { properties: { title: SHEET_NAME } } }] },
    });
  }
  await sheets.spreadsheets.values.update({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "'" + SHEET_NAME + "'!A1:P1",
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [headers] },
  });
  return sheets;
}

function prefixFor(type: CrmDocumentType, settings: MasterSettings) {
  return type === "Quotation" ? settings.quotationPrefix || "QTN" : settings.invoicePrefix || "INV";
}

async function nextReference(sheets: ReturnType<typeof google.sheets>, type: CrmDocumentType, settings: MasterSettings) {
  const year = new Date().getFullYear();
  const result = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: "'" + SHEET_NAME + "'!A2:N",
  });
  const count = (result.data.values ?? []).filter((row) =>
    String(row[0] ?? "").startsWith(String(year)) && String(row[1] ?? "") === type,
  ).length;
  return prefixFor(type, settings) + "-" + year + "-" + String(count + 1).padStart(4, "0");
}

function subtotalFromLines(lines: CrmDocumentInput["lines"]) {
  return Math.round(lines.reduce((sum, line) => sum + line.quantity * line.rate, 0) * 100) / 100;
}

export async function saveCrmDocument(document: CrmDocumentInput) {
  const [sheets, settings] = await Promise.all([ensureDocumentSheet(), getMasterSettings()]);
  const reference = await nextReference(sheets, document.type, settings);
  const calculation = calculateTaxBreakup({
    subtotal: subtotalFromLines(document.lines),
    taxRate: document.taxRate,
    sellerStateCode: settings.sellerStateCode,
    placeOfSupplyCode: document.placeOfSupplyCode,
  });

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: "'" + SHEET_NAME + "'!A:P",
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [[
      new Date().toISOString(), document.type, document.customer, document.customerGstin,
      document.placeOfSupplyCode, calculation.supplyType, calculation.subtotal, calculation.taxRate,
      calculation.cgst, calculation.kgst, calculation.igst, calculation.total,
      JSON.stringify(document.lines), reference, settings.paymentTerms, settings.gstin,
    ]] },
  });
  return { reference, calculation };
}

export type SavedCrmDocument = {
  createdAt: string;
  type: CrmDocumentType;
  customer: string;
  total: string;
  reference: string;
  supplyType: string;
};

export async function getCrmDocuments(type: CrmDocumentType): Promise<SavedCrmDocument[]> {
  if (!process.env.GOOGLE_SHEET_ID || !process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) return [];
  try {
    const sheets = google.sheets({ version: "v4", auth: getAuth() });
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      fields: "sheets.properties",
    });
    if (!spreadsheet.data.sheets?.some((sheet) => sheet.properties?.title === SHEET_NAME)) return [];
    const result = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "'" + SHEET_NAME + "'!A2:P",
    });
    return (result.data.values ?? [])
      .filter((row) => row[1] === type)
      .map((row) => ({
        createdAt: String(row[0] ?? ""),
        type,
        customer: String(row[2] ?? ""),
        total: String(row[11] ?? row[6] ?? ""),
        reference: String(row[13] ?? row[8] ?? ""),
        supplyType: String(row[5] ?? ""),
      }))
      .reverse();
  } catch (error) {
    console.error("Unable to load CRM documents.", error);
    return [];
  }
}
