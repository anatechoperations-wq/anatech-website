import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    projectId: process.env.GOOGLE_PROJECT_ID,
    clientEmail: process.env.GOOGLE_CLIENT_EMAIL,
    sheetId: process.env.GOOGLE_SHEET_ID,
    hasPrivateKey: !!process.env.GOOGLE_PRIVATE_KEY,
    privateKeyStartsWith: process.env.GOOGLE_PRIVATE_KEY?.substring(0, 30),
    privateKeyEndsWith: process.env.GOOGLE_PRIVATE_KEY?.slice(-30),
  });
}