import { NextRequest, NextResponse } from "next/server";
import { getSiteSettings, updateSiteSettings } from "@/lib/data/cms-store";

export async function GET() {
  const settings = await getSiteSettings();
  return NextResponse.json({ success: true, data: settings });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const updated = await updateSiteSettings(body);
    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}

