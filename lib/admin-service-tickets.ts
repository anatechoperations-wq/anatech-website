import "server-only";
import { google } from "googleapis";

const SHEET = "CRM Service Tickets";
export const ticketStatuses = ["New", "Scheduled", "In progress", "Waiting for customer", "Resolved", "Closed"] as const;
export const ticketPriorities = ["Low", "Normal", "High", "Urgent"] as const;
export type TicketStatus = typeof ticketStatuses[number];
export type TicketPriority = typeof ticketPriorities[number];
export type ServiceTicket = { row: number; createdAt: string; reference: string; customer: string; workOrder: string; project: string; category: string; priority: TicketPriority; location: string; request: string; assignee: string; scheduledDate: string; status: TicketStatus; resolution: string; completedAt: string };

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
    await client.spreadsheets.values.update({ spreadsheetId: process.env.GOOGLE_SHEET_ID, range: "'" + SHEET + "'!A1:O1", valueInputOption: "USER_ENTERED", requestBody: { values: [["Created at","Ticket no.","Customer","Work order","Project","Category","Priority","Location","Request","Assignee","Scheduled date","Status","Resolution","Completed at","Internal notes"]] } });
  }
  return client;
}
export async function getServiceTickets(): Promise<ServiceTicket[]> {
  if (!process.env.GOOGLE_SHEET_ID || !process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) return [];
  try {
    const client = sheets(); const result = await client.spreadsheets.values.get({ spreadsheetId: process.env.GOOGLE_SHEET_ID, range: "'" + SHEET + "'!A2:O" });
    return (result.data.values ?? []).map((row, index) => ({ row: index + 2, createdAt: String(row[0] ?? ""), reference: String(row[1] ?? ""), customer: String(row[2] ?? ""), workOrder: String(row[3] ?? ""), project: String(row[4] ?? ""), category: String(row[5] ?? ""), priority: ticketPriorities.includes(String(row[6] ?? "") as TicketPriority) ? String(row[6]) as TicketPriority : "Normal", location: String(row[7] ?? ""), request: String(row[8] ?? ""), assignee: String(row[9] ?? ""), scheduledDate: String(row[10] ?? ""), status: ticketStatuses.includes(String(row[11] ?? "") as TicketStatus) ? String(row[11]) as TicketStatus : "New", resolution: String(row[12] ?? ""), completedAt: String(row[13] ?? "") })).reverse();
  } catch { return []; }
}
export async function createServiceTicket(input: Omit<ServiceTicket, "row" | "createdAt" | "reference" | "resolution" | "completedAt"> & { notes: string }) {
  const client = await ensure();
  const existing = await client.spreadsheets.values.get({ spreadsheetId: process.env.GOOGLE_SHEET_ID!, range: "'" + SHEET + "'!A2:B" });
  const year = new Date().getFullYear();
  const number = "SVC-" + year + "-" + String((existing.data.values ?? []).filter((row) => String(row[0] ?? "").startsWith(String(year))).length + 1).padStart(4, "0");
  await client.spreadsheets.values.append({ spreadsheetId: process.env.GOOGLE_SHEET_ID!, range: "'" + SHEET + "'!A:O", valueInputOption: "USER_ENTERED", requestBody: { values: [[new Date().toISOString(), number, input.customer, input.workOrder, input.project, input.category, input.priority, input.location, input.request, input.assignee, input.scheduledDate, input.status, "", "", input.notes]] } });
  return { reference: number };
}
export async function updateServiceTicket(row: number, status: TicketStatus, resolution: string) {
  const client = await ensure();
  const completedAt = status === "Resolved" || status === "Closed" ? new Date().toISOString() : "";
  await client.spreadsheets.values.update({ spreadsheetId: process.env.GOOGLE_SHEET_ID!, range: "'" + SHEET + "'!L" + row + ":N" + row, valueInputOption: "USER_ENTERED", requestBody: { values: [[status, resolution, completedAt]] } });
}