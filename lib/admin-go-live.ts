import "server-only";
import { google } from "googleapis";

const SHEET = "CRM Go-Live Checklist";
export const goLiveItems = [
  "Production environment variables are configured",
  "Google Sheets service account access is tested",
  "Business legal, GST and bank settings are verified",
  "Custom domain and business email are configured",
  "Backup owner and recovery process are decided",
  "Accountant or GST reviewer has checked source records",
  "Private document storage location is selected",
  "Staff identity and role-access provider is selected before adding users",
] as const;
export type GoLiveState = Record<(typeof goLiveItems)[number], boolean>;
export const defaultGoLiveState = (): GoLiveState => Object.fromEntries(goLiveItems.map((item) => [item, false])) as GoLiveState;

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
    await client.spreadsheets.values.update({ spreadsheetId: process.env.GOOGLE_SHEET_ID, range: "'" + SHEET + "'!A1:B1", valueInputOption: "USER_ENTERED", requestBody: { values: [["Updated at", "Checklist state"]] } });
  }
  return client;
}
export async function getGoLiveState(): Promise<GoLiveState> {
  if (!process.env.GOOGLE_SHEET_ID || !process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) return defaultGoLiveState();
  try {
    const result = await sheets().spreadsheets.values.get({ spreadsheetId: process.env.GOOGLE_SHEET_ID, range: "'" + SHEET + "'!A2:B2" });
    const raw = result.data.values?.[0]?.[1];
    if (!raw) return defaultGoLiveState();
    const saved = JSON.parse(String(raw)) as Record<string, unknown>;
    return Object.fromEntries(goLiveItems.map((item) => [item, Boolean(saved[item])])) as GoLiveState;
  } catch { return defaultGoLiveState(); }
}
export async function saveGoLiveState(state: GoLiveState) {
  const client = await ensure();
  await client.spreadsheets.values.update({ spreadsheetId: process.env.GOOGLE_SHEET_ID!, range: "'" + SHEET + "'!A2:B2", valueInputOption: "USER_ENTERED", requestBody: { values: [[new Date().toISOString(), JSON.stringify(state)]] } });
}