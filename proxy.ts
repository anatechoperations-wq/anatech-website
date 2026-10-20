import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, verifyAdminSession } from "@/lib/admin-auth";
export async function proxy(request: NextRequest) { const session = await verifyAdminSession(request.cookies.get(SESSION_COOKIE)?.value); if (session) return NextResponse.next(); const loginUrl = new URL("/admin/login", request.url); loginUrl.searchParams.set("next", request.nextUrl.pathname); return NextResponse.redirect(loginUrl); }
export const config = { matcher: ["/admin", "/admin/((?!login).*)"] };