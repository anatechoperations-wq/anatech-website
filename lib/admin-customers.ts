import "server-only";

import { google } from "googleapis";

export type CrmCustomer = {
  row: number;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  notes: string;
};

const SHEET_NAME = "CRM Customers";

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

async function getSheets() {
  if (!process.env.GOOGLE_SHEET_ID) throw new Error("GOOGLE_SHEET_ID is missing.");
  return google.sheets({ version: "v4", auth: getAuth() });
}

async function ensureCustomerSheet() {
  const sheets = await getSheets();
  const spreadsheet = await sheets.spreadsheets.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    fields: "sheets.properties",
  });
  const exists = spreadsheet.data.sheets?.some((sheet) => sheet.properties?.title === SHEET_NAME);
  if (!exists) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: process.env.GOOGLE_SHEET_ID!,
      requestBody: { requests: [{ addSheet: { properties: { title: SHEET_NAME } } }] },
    });
    await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_SHEET_ID!,
      range: "'" + SHEET_NAME + "'!A1:G1",
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [["Created at", "Customer", "Email", "Phone", "Service", "Notes", "Source"]] },
    });
  }
  return sheets;
}

export async function getCrmCustomers(): Promise<CrmCustomer[]> {
  if (!process.env.GOOGLE_SHEET_ID || !process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) return [];
  try {
    const sheets = await getSheets();
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      fields: "sheets.properties",
    });
    if (!spreadsheet.data.sheets?.some((sheet) => sheet.properties?.title === SHEET_NAME)) return [];
    const result = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "'" + SHEET_NAME + "'!A2:F",
    });
    return (result.data.values ?? []).map((row, index) => ({
      row: index + 2,
      createdAt: String(row[0] ?? ""),
      name: String(row[1] ?? ""),
      email: String(row[2] ?? ""),
      phone: String(row[3] ?? ""),
      service: String(row[4] ?? ""),
      notes: String(row[5] ?? ""),
    })).reverse();
  } catch (error) {
    console.error("Unable to load CRM customers.", error);
    return [];
  }
}

export async function createCrmCustomer(input: Omit<CrmCustomer, "row" | "createdAt">) {
  const sheets = await ensureCustomerSheet();
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: "'" + SHEET_NAME + "'!A:G",
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [[new Date().toISOString(), input.name, input.email, input.phone, input.service, input.notes, "CRM"]] },
  });
}