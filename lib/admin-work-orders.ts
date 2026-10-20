import "server-only";
import { google } from "googleapis";
import { createCrmProject } from "@/lib/admin-projects";

const SHEET = "CRM Work Orders";
export const workOrderStatuses = ["Draft", "Approved", "Active", "On hold", "Completed", "Cancelled"] as const;
export type WorkOrderStatus = typeof workOrderStatuses[number];
export type WorkOrder = { createdAt: string; reference: string; customer: string; sourceQuotation: string; projectName: string; scope: string; owner: string; startDate: string; targetDate: string; totalValue: number; status: WorkOrderStatus; notes: string };

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
    await client.spreadsheets.values.update({ spreadsheetId: process.env.GOOGLE_SHEET_ID, range: "'" + SHEET + "'!A1:L1", valueInputOption: "USER_ENTERED", requestBody: { values: [["Created at","Work order no.","Customer","Source quotation","Project","Scope","Owner","Start date","Target date","Order value","Status","Notes"]] } });
  }
  return client;
}
export async function getWorkOrders(): Promise<WorkOrder[]> {
  if (!process.env.GOOGLE_SHEET_ID || !process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) return [];
  try {
    const client = sheets();
    const data = await client.spreadsheets.values.get({ spreadsheetId: process.env.GOOGLE_SHEET_ID, range: "'" + SHEET + "'!A2:L" });
    return (data.data.values ?? []).map((row) => ({ createdAt: String(row[0] ?? ""), reference: String(row[1] ?? ""), customer: String(row[2] ?? ""), sourceQuotation: String(row[3] ?? ""), projectName: String(row[4] ?? ""), scope: String(row[5] ?? ""), owner: String(row[6] ?? ""), startDate: String(row[7] ?? ""), targetDate: String(row[8] ?? ""), totalValue: Number(row[9] || 0), status: workOrderStatuses.includes(String(row[10] ?? "") as WorkOrderStatus) ? String(row[10]) as WorkOrderStatus : "Draft", notes: String(row[11] ?? "") })).reverse();
  } catch { return []; }
}
export async function createWorkOrder(input: Omit<WorkOrder, "createdAt" | "reference">) {
  const client = await ensure();
  const existing = await client.spreadsheets.values.get({ spreadsheetId: process.env.GOOGLE_SHEET_ID!, range: "'" + SHEET + "'!A2:B" });
  const year = new Date().getFullYear();
  const count = (existing.data.values ?? []).filter((row) => String(row[0] ?? "").startsWith(String(year))).length + 1;
  const reference = "WO-" + year + "-" + String(count).padStart(4, "0");
  await client.spreadsheets.values.append({ spreadsheetId: process.env.GOOGLE_SHEET_ID!, range: "'" + SHEET + "'!A:L", valueInputOption: "USER_ENTERED", requestBody: { values: [[new Date().toISOString(), reference, input.customer, input.sourceQuotation, input.projectName, input.scope, input.owner, input.startDate, input.targetDate, input.totalValue, input.status, input.notes]] } });
  if (input.status === "Approved" || input.status === "Active") await createCrmProject({ name: input.projectName, client: input.customer, stage: input.status === "Active" ? "In progress" : "Planning" });
  return { reference, projectCreated: input.status === "Approved" || input.status === "Active" };
}