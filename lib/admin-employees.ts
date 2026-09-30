import "server-only";
import { google } from "googleapis";

const SHEET = "CRM Employees";
export const employmentTypes = ["Proprietor", "Employee", "Consultant", "Intern", "Freelancer"] as const;
export const employeeStatuses = ["Active", "On leave", "Inactive"] as const;
export type EmploymentType = typeof employmentTypes[number];
export type EmployeeStatus = typeof employeeStatuses[number];
export type Employee = { row: number; createdAt: string; employeeId: string; name: string; department: string; designation: string; workEmail: string; phone: string; joinDate: string; employmentType: EmploymentType; monthlyCtc: number; status: EmployeeStatus; notes: string };

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
    await client.spreadsheets.values.update({ spreadsheetId: process.env.GOOGLE_SHEET_ID, range: "'" + SHEET + "'!A1:M1", valueInputOption: "USER_ENTERED", requestBody: { values: [["Created at","Employee ID","Name","Department","Designation","Work email","Phone","Join date","Employment type","Monthly CTC input","Status","Notes","Last updated"]] } });
  }
  return client;
}
export async function getEmployees(): Promise<Employee[]> {
  if (!process.env.GOOGLE_SHEET_ID || !process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) return [];
  try {
    const client = sheets(); const result = await client.spreadsheets.values.get({ spreadsheetId: process.env.GOOGLE_SHEET_ID, range: "'" + SHEET + "'!A2:M" });
    return (result.data.values ?? []).map((row, index) => ({ row: index + 2, createdAt: String(row[0] ?? ""), employeeId: String(row[1] ?? ""), name: String(row[2] ?? ""), department: String(row[3] ?? ""), designation: String(row[4] ?? ""), workEmail: String(row[5] ?? ""), phone: String(row[6] ?? ""), joinDate: String(row[7] ?? ""), employmentType: employmentTypes.includes(String(row[8] ?? "") as EmploymentType) ? String(row[8]) as EmploymentType : "Employee", monthlyCtc: Number(row[9] || 0), status: employeeStatuses.includes(String(row[10] ?? "") as EmployeeStatus) ? String(row[10]) as EmployeeStatus : "Active", notes: String(row[11] ?? "") })).reverse();
  } catch { return []; }
}
export async function createEmployee(input: Omit<Employee, "row" | "createdAt" | "employeeId">) {
  const client = await ensure();
  const existing = await client.spreadsheets.values.get({ spreadsheetId: process.env.GOOGLE_SHEET_ID!, range: "'" + SHEET + "'!A2:B" });
  const year = new Date().getFullYear();
  const employeeId = "EMP-" + year + "-" + String((existing.data.values ?? []).filter((row) => String(row[0] ?? "").startsWith(String(year))).length + 1).padStart(4, "0");
  await client.spreadsheets.values.append({ spreadsheetId: process.env.GOOGLE_SHEET_ID!, range: "'" + SHEET + "'!A:M", valueInputOption: "USER_ENTERED", requestBody: { values: [[new Date().toISOString(), employeeId, input.name, input.department, input.designation, input.workEmail, input.phone, input.joinDate, input.employmentType, input.monthlyCtc, input.status, input.notes, new Date().toISOString()]] } });
  return { employeeId };
}