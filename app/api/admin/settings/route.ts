import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { SESSION_COOKIE, verifyAdminSession } from "@/lib/admin-auth";
import { DEFAULT_MASTER_SETTINGS, getMasterSettings, saveMasterSettings, type MasterSettings } from "@/lib/admin-master-settings";

function isSettings(value: unknown): value is MasterSettings {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  return Object.keys(DEFAULT_MASTER_SETTINGS).every((key) =>
    typeof candidate[key] === "string" && candidate[key].trim().length <= 1000,
  ) && /^\\d{1,2}$/.test(String(candidate.sellerStateCode)) &&
    Number.isFinite(Number(candidate.defaultTaxRate)) &&
    Number(candidate.defaultTaxRate) >= 0 && Number(candidate.defaultTaxRate) <= 100;
}

async function authorized() {
  return verifyAdminSession((await cookies()).get(SESSION_COOKIE)?.value);
}

export async function GET() {
  if (!await authorized()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    return NextResponse.json({ settings: await getMasterSettings() });
  } catch {
    return NextResponse.json({ error: "Could not load master settings." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!await authorized()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json().catch(() => null);
  if (!isSettings(body)) return NextResponse.json({ error: "Please check the master settings values." }, { status: 400 });
  try {
    return NextResponse.json({ settings: await saveMasterSettings(body) });
  } catch {
    return NextResponse.json({ error: "Could not save master settings. Confirm Google Sheets CRM configuration." }, { status: 500 });
  }
}
