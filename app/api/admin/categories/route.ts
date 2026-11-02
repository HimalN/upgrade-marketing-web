import { NextRequest, NextResponse } from "next/server";
import { getProjectCategories, saveProjectCategory, deleteProjectCategory } from "@/lib/data/cms-store";

export async function GET() {
  const categories = await getProjectCategories();
  return NextResponse.json({ success: true, data: categories });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name || !body.slug) {
      return NextResponse.json({ success: false, message: "Name and slug required" }, { status: 400 });
    }
    const saved = await saveProjectCategory(body);
    return NextResponse.json({ success: true, data: saved });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ success: false, message: "Category ID required" }, { status: 400 });
    await deleteProjectCategory(id);
    return NextResponse.json({ success: true, message: "Category deleted" });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}

