import "server-only";
import { google } from "googleapis";

const SHEET = "CRM Tenders";
export const tenderStatuses = ["Draft", "Documents pending", "Ready for review", "Submitted", "Awarded", "Not awarded"] as const;
export const boqStatuses = ["Not received", "Original template preserved", "Completed for review", "Manual submission verified"] as const;
export const defaultTenderChecklist = [
  "Tender schedule and NIT reviewed",
  "Signed bid document",
  "Company registration / GSTIN",
  "PAN / tax registration",
  "IEC, where the tender requires it",
  "Financial statements / turnover proof",
  "Experience / work completion certificates",
  "Authorization / power of attorney",
  "EMD or exemption proof",
  "BOQ source file kept unchanged",
  "Corrigendum checked before submission",
  "Digital signature and portal submission verified",
] as const;

export type TenderRecord = { createdAt: string; reference: string; title: string; authority: string; portalUrl: string; dueDate: string; emdAmount: number; status: string; boqStatus: string; mandatoryDocuments: string[]; notes: string; checklist: Record<string, boolean> };

function sheets() {
  const auth = new google.auth.GoogleAuth({ credentials: { project_id: process.env.GOOGLE_PROJECT_ID, client_email: process.env.GOOGLE_CLIENT_EMAIL, private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n") }, scopes: ["https://www.googleapis.com/auth/spreadsheets"] });
  return google.sheets({ version: "v4", auth });
}
async function ensure() {
  if (!process.env.GOOGLE_SHEET_ID) throw new Error("GOOGLE_SHEET_ID is missing.");
  const client = sheets();
  const book = await client.spreadsheets.get({ spreadsheetId: process.env.GOOGLE_SHEET_ID, fields: "sheets.properties" });
  if (!book.data.sheets?.some((sheet) => sheet.properties?.title === SHEET)) {
    await client.spreadsheets.batchUpdate({ spreadsheetId: process.env.GOOGLE_SHEET_ID, requestBody: { requests: [{ addSheet: { properties: { title: SHEET } } }] } });
    await client.spreadsheets.values.update({ spreadsheetId: process.env.GOOGLE_SHEET_ID, range: "'" + SHEET + "'!A1:L1", valueInputOption: "USER_ENTERED", requestBody: { values: [["Created at","Tender reference","Title","Authority","Portal URL","Due date","EMD amount","Status","BOQ status","Mandatory documents","Notes","Checklist state"]] } });
  }
  return client;
}
export async function getTenders(): Promise<TenderRecord[]> {
  if (!process.env.GOOGLE_SHEET_ID || !process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) return [];
  try {
    const client = sheets();
    const result = await client.spreadsheets.values.get({ spreadsheetId: process.env.GOOGLE_SHEET_ID, range: "'" + SHEET + "'!A2:L" });
    return (result.data.values ?? []).map((row) => ({ createdAt: String(row[0] ?? ""), reference: String(row[1] ?? ""), title: String(row[2] ?? ""), authority: String(row[3] ?? ""), portalUrl: String(row[4] ?? ""), dueDate: String(row[5] ?? ""), emdAmount: Number(row[6] || 0), status: String(row[7] ?? "Draft"), boqStatus: String(row[8] ?? "Not received"), mandatoryDocuments: JSON.parse(String(row[9] || "[]")) as string[], notes: String(row[10] ?? ""), checklist: JSON.parse(String(row[11] || "{}")) as Record<string, boolean> })).sort((a,b) => a.dueDate.localeCompare(b.dueDate));
  } catch { return []; }
}
export async function saveTender(input: Omit<TenderRecord, "createdAt">) {
  const client = await ensure();
  await client.spreadsheets.values.append({ spreadsheetId: process.env.GOOGLE_SHEET_ID!, range: "'" + SHEET + "'!A:L", valueInputOption: "USER_ENTERED", requestBody: { values: [[new Date().toISOString(), input.reference, input.title, input.authority, input.portalUrl, input.dueDate, input.emdAmount, input.status, input.boqStatus, JSON.stringify(input.mandatoryDocuments), input.notes, JSON.stringify(input.checklist)]] } });
  return { reference: input.reference || "Tender saved" };
}