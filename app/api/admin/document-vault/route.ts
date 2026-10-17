import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifyAdminSession } from "@/lib/admin-auth";
import { documentAccessLevels, documentCategories, documentStatuses, getDocumentVaultRecords, saveDocumentVaultRecord } from "@/lib/admin-document-vault";

function isString(value: unknown, max = 500): value is string { return typeof value === "string" && value.trim().length > 0 && value.length <= max; }
function isHttpsUrl(value: unknown): value is string { try { return typeof value === "string" && new URL(value).protocol === "https:"; } catch { return false; } }

export async function GET() {
  if (!await verifyAdminSession((await cookies()).get(SESSION_COOKIE)?.value)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ documents: await getDocumentVaultRecords() });
}
export async function POST(request: Request) {
  if (!await verifyAdminSession((await cookies()).get(SESSION_COOKIE)?.value)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  const title = body?.title, category = body?.category, secureUrl = body?.secureUrl, relatedReference = body?.relatedReference, reviewDate = body?.reviewDate, accessLevel = body?.accessLevel, status = body?.status, notes = body?.notes;
  if (!body || !isString(title, 250) || typeof category !== "string" || !documentCategories.includes(category as typeof documentCategories[number]) || !isHttpsUrl(secureUrl) || typeof relatedReference !== "string" || relatedReference.length > 150 || typeof reviewDate !== "string" || !/^\\d{4}-\\d{2}-\\d{2}$/.test(reviewDate) || typeof accessLevel !== "string" || !documentAccessLevels.includes(accessLevel as typeof documentAccessLevels[number]) || typeof status !== "string" || !documentStatuses.includes(status as typeof documentStatuses[number]) || typeof notes !== "string" || notes.length > 2000) return NextResponse.json({ error: "Enter a title, HTTPS restricted link, review date and valid access class. Do not place passwords, bank details or ID numbers in notes." }, { status: 400 });
  try {
    return NextResponse.json({ ok: true, ...(await saveDocumentVaultRecord({ category, title: title.trim(), relatedReference: relatedReference.trim(), secureUrl: secureUrl.trim(), reviewDate, accessLevel, status, notes: notes.trim() })) });
  } catch { return NextResponse.json({ error: "Could not save the document register. Confirm Google Sheets credentials and access." }, { status: 500 }); }
}