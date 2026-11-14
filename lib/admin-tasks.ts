import "server-only";

import { google } from "googleapis";

export const TASK_STATUSES = ["Not started", "In progress", "Blocked", "Completed"] as const;
export type TaskStatus = typeof TASK_STATUSES[number];

export type CrmTask = {
  row: number;
  createdAt: string;
  project: string;
  title: string;
  owner: string;
  dueDate: string;
  status: TaskStatus;
};

const SHEET_NAME = "CRM Tasks";

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

async function ensureTaskSheet() {
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
      range: "'" + SHEET_NAME + "'!A1:F1",
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [["Created at", "Project", "Task", "Owner", "Due date", "Status"]] },
    });
  }
  return sheets;
}

export async function getCrmTasks(): Promise<CrmTask[]> {
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
    return (result.data.values ?? []).map((row, index) => {
      const candidate = String(row[5] ?? "Not started");
      return {
        row: index + 2,
        createdAt: String(row[0] ?? ""),
        project: String(row[1] ?? ""),
        title: String(row[2] ?? ""),
        owner: String(row[3] ?? ""),
        dueDate: String(row[4] ?? ""),
        status: TASK_STATUSES.includes(candidate as TaskStatus) ? candidate as TaskStatus : "Not started",
      };
    }).reverse();
  } catch (error) {
    console.error("Unable to load CRM tasks.", error);
    return [];
  }
}

export async function createCrmTask(input: Omit<CrmTask, "row" | "createdAt">) {
  const sheets = await ensureTaskSheet();
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: "'" + SHEET_NAME + "'!A:F",
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [[new Date().toISOString(), input.project, input.title, input.owner, input.dueDate, input.status]] },
  });
}

export async function updateCrmTaskStatus(row: number, status: TaskStatus) {
  if (!Number.isInteger(row) || row < 2 || !TASK_STATUSES.includes(status)) throw new Error("Invalid task update.");
  const sheets = await getSheets();
  await sheets.spreadsheets.values.update({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: "'" + SHEET_NAME + "'!F" + row,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [[status]] },
  });
}