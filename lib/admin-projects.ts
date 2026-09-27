import "server-only";

import { google } from "googleapis";

export const PROJECT_STAGES = ["Discovery", "Planning", "In progress", "Review", "Completed"] as const;
export type ProjectStage = typeof PROJECT_STAGES[number];

export type CrmProject = {
  row: number;
  createdAt: string;
  name: string;
  client: string;
  stage: ProjectStage;
};

const SHEET_NAME = "CRM Projects";

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

async function ensureProjectSheet() {
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
      range: "'" + SHEET_NAME + "'!A1:D1",
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [["Created at", "Project", "Client", "Stage"]] },
    });
  }

  return sheets;
}

export async function getCrmProjects(): Promise<CrmProject[]> {
  if (!process.env.GOOGLE_SHEET_ID || !process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) return [];

  try {
    const sheets = await getSheets();
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      fields: "sheets.properties",
    });
    const exists = spreadsheet.data.sheets?.some((sheet) => sheet.properties?.title === SHEET_NAME);
    if (!exists) return [];

    const result = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "'" + SHEET_NAME + "'!A2:D",
    });
    return (result.data.values ?? []).map((row, index) => {
      const candidate = String(row[3] ?? "Discovery");
      return {
        row: index + 2,
        createdAt: String(row[0] ?? ""),
        name: String(row[1] ?? ""),
        client: String(row[2] ?? ""),
        stage: PROJECT_STAGES.includes(candidate as ProjectStage) ? candidate as ProjectStage : "Discovery",
      };
    }).reverse();
  } catch (error) {
    console.error("Unable to load CRM projects.", error);
    return [];
  }
}

export async function createCrmProject(input: Omit<CrmProject, "row" | "createdAt">) {
  const sheets = await ensureProjectSheet();
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: "'" + SHEET_NAME + "'!A:D",
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [[new Date().toISOString(), input.name, input.client, input.stage]] },
  });
}