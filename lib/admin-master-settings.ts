import "server-only";

import { google } from "googleapis";

export type MasterSettings = {
  companyName: string;
  address: string;
  email: string;
  phone: string;
  gstin: string;
  iec: string;
  bankName: string;
  bankAccount: string;
  bankIfsc: string;
  paymentTerms: string;
  sellerStateCode: string;
  defaultTaxRate: string;
  quotationPrefix: string;
  invoicePrefix: string;
};

const SHEET_NAME = "CRM Master Settings";

export const DEFAULT_MASTER_SETTINGS: MasterSettings = {
  companyName: "ANATECH Technology Solutions",
  address: "Kollam, Kerala, India",
  email: "anatech.operations@gmail.com",
  phone: "+91 89215 20858",
  gstin: process.env.COMPANY_GSTIN || "",
  iec: process.env.COMPANY_IEC || "",
  bankName: process.env.COMPANY_BANK_NAME || "",
  bankAccount: process.env.COMPANY_BANK_ACCOUNT || "",
  bankIfsc: process.env.COMPANY_BANK_IFSC || "",
  paymentTerms: process.env.DOCUMENT_PAYMENT_TERMS || "Payment terms to be confirmed with the customer.",
  sellerStateCode: process.env.COMPANY_GST_STATE_CODE || "32",
  defaultTaxRate: process.env.DOCUMENT_DEFAULT_GST_RATE || "18",
  quotationPrefix: process.env.DOCUMENT_QUOTATION_PREFIX || "QTN",
  invoicePrefix: process.env.DOCUMENT_INVOICE_PREFIX || "INV",
};

function configured() {
  return Boolean(process.env.GOOGLE_SHEET_ID && process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY);
}

function getSheets() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      project_id: process.env.GOOGLE_PROJECT_ID,
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return google.sheets({ version: "v4", auth });
}

async function ensureMasterSheet() {
  if (!configured()) return null;
  const sheets = getSheets();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID!;
  const spreadsheet = await sheets.spreadsheets.get({
    spreadsheetId,
    fields: "sheets.properties",
  });
  const exists = spreadsheet.data.sheets?.some((sheet) => sheet.properties?.title === SHEET_NAME);

  if (!exists) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: { requests: [{ addSheet: { properties: { title: SHEET_NAME } } }] },
    });
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: "'" + SHEET_NAME + "'!A1:B1",
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [["Setting", "Value"]] },
    });
  }
  return sheets;
}

function fromRows(rows: string[][]): MasterSettings {
  const values = Object.fromEntries(rows
    .filter((row) => typeof row[0] === "string")
    .map((row) => [row[0], String(row[1] ?? "")]));
  return {
    ...DEFAULT_MASTER_SETTINGS,
    ...Object.fromEntries(Object.keys(DEFAULT_MASTER_SETTINGS).map((key) => [key, values[key] ?? DEFAULT_MASTER_SETTINGS[key as keyof MasterSettings]])),
  } as MasterSettings;
}

export async function getMasterSettings(): Promise<MasterSettings> {
  const sheets = await ensureMasterSheet();
  if (!sheets) return DEFAULT_MASTER_SETTINGS;

  const result = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: "'" + SHEET_NAME + "'!A2:B",
  });
  return fromRows((result.data.values ?? []).map((row) => [String(row[0] ?? ""), String(row[1] ?? "")]));
}

export async function saveMasterSettings(input: MasterSettings) {
  const sheets = await ensureMasterSheet();
  if (!sheets) throw new Error("Google Sheets CRM is not configured.");
  const rows = Object.entries(input);
  await sheets.spreadsheets.values.clear({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: "'" + SHEET_NAME + "'!A2:B",
  });
  await sheets.spreadsheets.values.update({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: "'" + SHEET_NAME + "'!A2:B" + (rows.length + 1),
    valueInputOption: "USER_ENTERED",
    requestBody: { values: rows },
  });
  return input;
}

export function calculateTaxBreakup(input: {
  subtotal: number;
  taxRate: number;
  sellerStateCode: string;
  placeOfSupplyCode: string;
}) {
  const subtotal = Math.round(input.subtotal * 100) / 100;
  const taxRate = Math.round(input.taxRate * 100) / 100;
  const taxAmount = Math.round(subtotal * taxRate) / 100;
  const intraState = input.sellerStateCode === input.placeOfSupplyCode;
  const cgst = intraState ? Math.round((taxAmount / 2) * 100) / 100 : 0;
  const kgst = intraState ? Math.round((taxAmount - cgst) * 100) / 100 : 0;
  const igst = intraState ? 0 : taxAmount;
  return {
    subtotal,
    taxRate,
    taxAmount,
    cgst,
    kgst,
    igst,
    total: Math.round((subtotal + taxAmount) * 100) / 100,
    supplyType: intraState ? "Intra-state" : "Inter-state",
  };
}
