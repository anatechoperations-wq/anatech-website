import "server-only";
import { google } from "googleapis";

const VENDORS = "CRM Vendors";
const PURCHASES = "CRM Purchases";
const ASSETS = "CRM Assets";
export const purchaseStatuses = ["Requested", "Approved", "Ordered", "Received", "Cancelled"] as const;
export const assetStatuses = ["In stock", "Assigned", "Under repair", "Disposed"] as const;
export type PurchaseStatus = typeof purchaseStatuses[number];
export type AssetStatus = typeof assetStatuses[number];
export type Vendor = { createdAt: string; code: string; name: string; category: string; contact: string; email: string; phone: string; gstin: string; notes: string };
export type Purchase = { createdAt: string; reference: string; vendor: string; item: string; category: string; project: string; quantity: number; unitCost: number; total: number; status: PurchaseStatus; expectedDate: string; notes: string };
export type Asset = { createdAt: string; assetId: string; name: string; category: string; serialNo: string; purchaseRef: string; location: string; assignedTo: string; warrantyUntil: string; status: AssetStatus; notes: string };

function sheets() {
  const auth = new google.auth.GoogleAuth({ credentials: { project_id: process.env.GOOGLE_PROJECT_ID, client_email: process.env.GOOGLE_CLIENT_EMAIL, private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n") }, scopes: ["https://www.googleapis.com/auth/spreadsheets"] });
  return google.sheets({ version: "v4", auth });
}
async function ensureSheet(client: ReturnType<typeof sheets>, name: string, headers: string[]) {
  const book = await client.spreadsheets.get({ spreadsheetId: process.env.GOOGLE_SHEET_ID!, fields: "sheets.properties" });
  if (!book.data.sheets?.some((sheet) => sheet.properties?.title === name)) {
    await client.spreadsheets.batchUpdate({ spreadsheetId: process.env.GOOGLE_SHEET_ID!, requestBody: { requests: [{ addSheet: { properties: { title: name } } }] } });
    await client.spreadsheets.values.update({ spreadsheetId: process.env.GOOGLE_SHEET_ID!, range: "'" + name + "'!A1:" + String.fromCharCode(64 + headers.length) + "1", valueInputOption: "USER_ENTERED", requestBody: { values: [headers] } });
  }
}
async function ensureAll() {
  if (!process.env.GOOGLE_SHEET_ID) throw new Error("GOOGLE_SHEET_ID is missing.");
  const client = sheets();
  await ensureSheet(client, VENDORS, ["Created at","Vendor code","Vendor name","Category","Contact person","Email","Phone","GSTIN","Notes"]);
  await ensureSheet(client, PURCHASES, ["Created at","Purchase no.","Vendor","Item","Category","Project / work order","Quantity","Unit cost","Total","Status","Expected date","Notes"]);
  await ensureSheet(client, ASSETS, ["Created at","Asset ID","Asset name","Category","Serial / licence no.","Purchase reference","Location","Assigned to","Warranty until","Status","Notes"]);
  return client;
}
export async function getProcurementData(): Promise<{ vendors: Vendor[]; purchases: Purchase[]; assets: Asset[] }> {
  if (!process.env.GOOGLE_SHEET_ID || !process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) return { vendors: [], purchases: [], assets: [] };
  try {
    const client = sheets(); const book = await client.spreadsheets.get({ spreadsheetId: process.env.GOOGLE_SHEET_ID, fields: "sheets.properties" });
    const has = (name: string) => Boolean(book.data.sheets?.some((sheet) => sheet.properties?.title === name));
    const [vendorRows, purchaseRows, assetRows] = await Promise.all([
      has(VENDORS) ? client.spreadsheets.values.get({ spreadsheetId: process.env.GOOGLE_SHEET_ID, range: "'" + VENDORS + "'!A2:I" }) : Promise.resolve({ data: { values: [] as string[][] } }),
      has(PURCHASES) ? client.spreadsheets.values.get({ spreadsheetId: process.env.GOOGLE_SHEET_ID, range: "'" + PURCHASES + "'!A2:L" }) : Promise.resolve({ data: { values: [] as string[][] } }),
      has(ASSETS) ? client.spreadsheets.values.get({ spreadsheetId: process.env.GOOGLE_SHEET_ID, range: "'" + ASSETS + "'!A2:K" }) : Promise.resolve({ data: { values: [] as string[][] } }),
    ]);
    return { vendors: (vendorRows.data.values ?? []).map(r => ({ createdAt:String(r[0]??""),code:String(r[1]??""),name:String(r[2]??""),category:String(r[3]??""),contact:String(r[4]??""),email:String(r[5]??""),phone:String(r[6]??""),gstin:String(r[7]??""),notes:String(r[8]??"") })).reverse(), purchases: (purchaseRows.data.values ?? []).map(r => ({ createdAt:String(r[0]??""),reference:String(r[1]??""),vendor:String(r[2]??""),item:String(r[3]??""),category:String(r[4]??""),project:String(r[5]??""),quantity:Number(r[6]||0),unitCost:Number(r[7]||0),total:Number(r[8]||0),status:purchaseStatuses.includes(String(r[9]??"") as PurchaseStatus)?String(r[9]) as PurchaseStatus:"Requested",expectedDate:String(r[10]??""),notes:String(r[11]??"") })).reverse(), assets: (assetRows.data.values ?? []).map(r => ({ createdAt:String(r[0]??""),assetId:String(r[1]??""),name:String(r[2]??""),category:String(r[3]??""),serialNo:String(r[4]??""),purchaseRef:String(r[5]??""),location:String(r[6]??""),assignedTo:String(r[7]??""),warrantyUntil:String(r[8]??""),status:assetStatuses.includes(String(r[9]??"") as AssetStatus)?String(r[9]) as AssetStatus:"In stock",notes:String(r[10]??"") })).reverse() };
  } catch { return { vendors: [], purchases: [], assets: [] }; }
}
async function nextNumber(client: ReturnType<typeof sheets>, sheet: string, prefix: string) { const data = await client.spreadsheets.values.get({ spreadsheetId: process.env.GOOGLE_SHEET_ID!, range: "'" + sheet + "'!A2:B" }); const year=new Date().getFullYear(); return prefix + "-" + year + "-" + String((data.data.values??[]).filter(r=>String(r[0]??"").startsWith(String(year))).length+1).padStart(4,"0"); }
export async function createVendor(input: Omit<Vendor,"createdAt"|"code">) { const client=await ensureAll(); const code=await nextNumber(client,VENDORS,"VND"); await client.spreadsheets.values.append({spreadsheetId:process.env.GOOGLE_SHEET_ID!,range:"'"+VENDORS+"'!A:I",valueInputOption:"USER_ENTERED",requestBody:{values:[[new Date().toISOString(),code,input.name,input.category,input.contact,input.email,input.phone,input.gstin,input.notes]]}}); return { reference:code }; }
export async function createPurchase(input: Omit<Purchase,"createdAt"|"reference"|"total">) { const client=await ensureAll(); const reference=await nextNumber(client,PURCHASES,"PUR"); const total=Math.round(input.quantity*input.unitCost*100)/100; await client.spreadsheets.values.append({spreadsheetId:process.env.GOOGLE_SHEET_ID!,range:"'"+PURCHASES+"'!A:L",valueInputOption:"USER_ENTERED",requestBody:{values:[[new Date().toISOString(),reference,input.vendor,input.item,input.category,input.project,input.quantity,input.unitCost,total,input.status,input.expectedDate,input.notes]]}}); return { reference,total }; }
export async function createAsset(input: Omit<Asset,"createdAt"|"assetId">) { const client=await ensureAll(); const assetId=await nextNumber(client,ASSETS,"AST"); await client.spreadsheets.values.append({spreadsheetId:process.env.GOOGLE_SHEET_ID!,range:"'"+ASSETS+"'!A:K",valueInputOption:"USER_ENTERED",requestBody:{values:[[new Date().toISOString(),assetId,input.name,input.category,input.serialNo,input.purchaseRef,input.location,input.assignedTo,input.warrantyUntil,input.status,input.notes]]}}); return { reference:assetId }; }