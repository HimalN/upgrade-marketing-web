import { NextRequest, NextResponse } from "next/server";
import { getPricingPackages, savePricingPackage, deletePricingPackage } from "@/lib/data/cms-store";

export async function GET() {
  const packages = await getPricingPackages(false);
  return NextResponse.json({ success: true, data: packages });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name || !body.price) {
      return NextResponse.json({ success: false, message: "Package name and price required" }, { status: 400 });
    }
    const saved = await savePricingPackage(body);
    return NextResponse.json({ success: true, data: saved });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ success: false, message: "Package ID required" }, { status: 400 });
    await deletePricingPackage(id);
    return NextResponse.json({ success: true, message: "Package deleted" });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}

