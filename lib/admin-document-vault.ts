import "server-only";
import { google } from "googleapis";

const SHEET = "CRM Document Vault";
export const documentCategories = ["Company", "Customer", "Project", "Tender", "HR", "Finance", "Other"] as const;
export const documentAccessLevels = ["Owner / Admin", "Finance", "Operations", "HR"] as const;
export const documentStatuses = ["Active", "Archived", "Expired"] as const;

export type DocumentVaultRecord = {
  createdAt: string; reference: string; category: string; title: string; relatedReference: string;
  secureUrl: string; reviewDate: string; accessLevel: string; status: string; notes: string;
};

function sheets() {
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
async function ensure() {
  if (!process.env.GOOGLE_SHEET_ID) throw new Error("GOOGLE_SHEET_ID is missing.");
  const client = sheets();
  const book = await client.spreadsheets.get({ spreadsheetId: process.env.GOOGLE_SHEET_ID, fields: "sheets.properties" });
  if (!book.data.sheets?.some((sheet) => sheet.properties?.title === SHEET)) {
    await client.spreadsheets.batchUpdate({ spreadsheetId: process.env.GOOGLE_SHEET_ID, requestBody: { requests: [{ addSheet: { properties: { title: SHEET } } }] } });
    await client.spreadsheets.values.update({ spreadsheetId: process.env.GOOGLE_SHEET_ID, range: "'" + SHEET + "'!A1:J1", valueInputOption: "USER_ENTERED", requestBody: { values: [["Created at", "Reference", "Category", "Title", "Related reference", "Restricted link", "Review date", "Access class", "Status", "Internal notes"]] } });
  }
  return client;
}
export async function getDocumentVaultRecords(): Promise<DocumentVaultRecord[]> {
  if (!process.env.GOOGLE_SHEET_ID || !process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) return [];
  try {
    const result = await sheets().spreadsheets.values.get({ spreadsheetId: process.env.GOOGLE_SHEET_ID, range: "'" + SHEET + "'!A2:J" });
    return (result.data.values ?? []).map((row) => ({
      createdAt: String(row[0] ?? ""), reference: String(row[1] ?? ""), category: String(row[2] ?? ""),
      title: String(row[3] ?? ""), relatedReference: String(row[4] ?? ""), secureUrl: String(row[5] ?? ""),
      reviewDate: String(row[6] ?? ""), accessLevel: String(row[7] ?? ""), status: String(row[8] ?? ""), notes: String(row[9] ?? ""),
    })).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } catch { return []; }
}
export async function saveDocumentVaultRecord(input: Omit<DocumentVaultRecord, "createdAt" | "reference">) {
  const client = await ensure();
  const reference = "DOC-" + Date.now().toString(36).toUpperCase();
  await client.spreadsheets.values.append({ spreadsheetId: process.env.GOOGLE_SHEET_ID!, range: "'" + SHEET + "'!A:J", valueInputOption: "USER_ENTERED", requestBody: { values: [[new Date().toISOString(), reference, input.category, input.title, input.relatedReference, input.secureUrl, input.reviewDate, input.accessLevel, input.status, input.notes]] } });
  return { reference };
}