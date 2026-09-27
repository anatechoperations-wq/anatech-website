import "server-only";
import { google } from "googleapis";
import { calculateTaxBreakup, getMasterSettings } from "@/lib/admin-master-settings";

const SHEET = "CRM Credit Notes";
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
    await client.spreadsheets.values.update({ spreadsheetId: process.env.GOOGLE_SHEET_ID, range: "'" + SHEET + "'!A1:L1", valueInputOption: "USER_ENTERED", requestBody: { values: [["Created at","Credit note no.","Original invoice","Customer","Reason","Place of supply","Taxable value","GST rate","CGST","KGST","IGST","Total"]] } });
  }
  return client;
}
export async function saveCreditNote(input: { originalInvoice: string; customer: string; reason: string; placeOfSupplyCode: string; taxableValue: number; taxRate: number }) {
  const [client, settings] = await Promise.all([ensure(), getMasterSettings()]);
  const existing = await client.spreadsheets.values.get({ spreadsheetId: process.env.GOOGLE_SHEET_ID!, range: "'" + SHEET + "'!A2:B" });
  const year = new Date().getFullYear();
  const number = "CRN-" + year + "-" + String((existing.data.values ?? []).filter((row) => String(row[0] ?? "").startsWith(String(year))).length + 1).padStart(4, "0");
  const tax = calculateTaxBreakup({ subtotal: input.taxableValue, taxRate: input.taxRate, sellerStateCode: settings.sellerStateCode, placeOfSupplyCode: input.placeOfSupplyCode });
  await client.spreadsheets.values.append({ spreadsheetId: process.env.GOOGLE_SHEET_ID!, range: "'" + SHEET + "'!A:L", valueInputOption: "USER_ENTERED", requestBody: { values: [[new Date().toISOString(), number, input.originalInvoice, input.customer, input.reason, input.placeOfSupplyCode, tax.subtotal, tax.taxRate, tax.cgst, tax.kgst, tax.igst, tax.total]] } });
  return { number, tax };
}
export async function getCreditNoteTotals(period: string) {
  if (!process.env.GOOGLE_SHEET_ID || !process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) return { taxable: 0, cgst: 0, kgst: 0, igst: 0, total: 0, count: 0 };
  try {
    const client = sheets(); const values = await client.spreadsheets.values.get({ spreadsheetId: process.env.GOOGLE_SHEET_ID, range: "'" + SHEET + "'!A2:L" });
    return (values.data.values ?? []).filter((row) => String(row[0] ?? "").slice(0,7) === period).reduce((sum, row) => ({ taxable: sum.taxable + Number(row[6] || 0), cgst: sum.cgst + Number(row[8] || 0), kgst: sum.kgst + Number(row[9] || 0), igst: sum.igst + Number(row[10] || 0), total: sum.total + Number(row[11] || 0), count: sum.count + 1 }), { taxable: 0, cgst: 0, kgst: 0, igst: 0, total: 0, count: 0 });
  } catch { return { taxable: 0, cgst: 0, kgst: 0, igst: 0, total: 0, count: 0 }; }
}
