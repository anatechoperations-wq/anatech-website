import "server-only";

import { google } from "googleapis";

export type CrmDocumentType = "Quotation" | "Invoice";

export type CrmDocumentInput = {
  type: CrmDocumentType;
  customer: string;
  taxRate: number;
  subtotal: number;
  taxAmount: number;
  total: number;
  lines: Array<{ description: string; quantity: number; rate: number }>;
};

export type BusinessDocumentSettings = {
  gstin: string;
  iec: string;
  bankName: string;
  bankAccount: string;
  bankIfsc: string;
  paymentTerms: string;
};

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

export function getBusinessDocumentSettings(): BusinessDocumentSettings {
  return {
    gstin: process.env.COMPANY_GSTIN || "",
    iec: process.env.COMPANY_IEC || "",
    bankName: process.env.COMPANY_BANK_NAME || "",
    bankAccount: process.env.COMPANY_BANK_ACCOUNT || "",
    bankIfsc: process.env.COMPANY_BANK_IFSC || "",
    paymentTerms: process.env.DOCUMENT_PAYMENT_TERMS || "Payment terms to be confirmed with the customer.",
  };
}

async function ensureDocumentSheet() {
  if (!process.env.GOOGLE_SHEET_ID) throw new Error("GOOGLE_SHEET_ID is missing.");

  const sheets = google.sheets({ version: "v4", auth: getAuth() });
  const spreadsheet = await sheets.spreadsheets.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    fields: "sheets.properties",
  });
  const exists = spreadsheet.data.sheets?.some((sheet) => sheet.properties?.title === SHEET_NAME);

  if (!exists) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      requestBody: { requests: [{ addSheet: { properties: { title: SHEET_NAME } } }] },
    });
    await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "'" + SHEET_NAME + "'!A1:J1",
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [[
        "Created at", "Document type", "Customer", "Subtotal", "GST rate",
        "GST amount", "Total", "Line items", "Document reference", "Payment terms",
      ]] },
    });
  } else {
    await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "'" + SHEET_NAME + "'!I1:J1",
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [["Document reference", "Payment terms"]] },
    });
  }

  return sheets;
}

function prefixFor(type: CrmDocumentType) {
  return type === "Quotation"
    ? (process.env.DOCUMENT_QUOTATION_PREFIX || "QTN")
    : (process.env.DOCUMENT_INVOICE_PREFIX || "INV");
}

async function nextReference(sheets: ReturnType<typeof google.sheets>, type: CrmDocumentType) {
  const year = new Date().getFullYear();
  const result = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: "'" + SHEET_NAME + "'!A2:I",
  });
  const count = (result.data.values ?? []).filter((row) =>
    String(row[0] ?? "").startsWith(String(year)) && String(row[1] ?? "") === type,
  ).length;
  return prefixFor(type) + "-" + year + "-" + String(count + 1).padStart(4, "0");
}

export async function saveCrmDocument(document: CrmDocumentInput) {
  const sheets = await ensureDocumentSheet();
  const reference = await nextReference(sheets, document.type);
  const settings = getBusinessDocumentSettings();

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: "'" + SHEET_NAME + "'!A:J",
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [[
      new Date().toISOString(), document.type, document.customer, document.subtotal,
      document.taxRate, document.taxAmount, document.total, JSON.stringify(document.lines),
      reference, settings.paymentTerms,
    ]] },
  });
  return reference;
}

export type SavedCrmDocument = {
  createdAt: string;
  type: CrmDocumentType;
  customer: string;
  total: string;
  reference: string;
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
      range: "'" + SHEET_NAME + "'!A2:J",
    });
    return (result.data.values ?? [])
      .filter((row) => row[1] === type)
      .map((row) => ({
        createdAt: String(row[0] ?? ""),
        type,
        customer: String(row[2] ?? ""),
        total: String(row[6] ?? ""),
        reference: String(row[8] ?? ""),
      }))
      .reverse();
  } catch (error) {
    console.error("Unable to load CRM documents.", error);
    return [];
  }
}