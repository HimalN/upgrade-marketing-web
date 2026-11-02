import { NextRequest, NextResponse } from "next/server";
import { getFaqs, saveFaq, deleteFaq } from "@/lib/data/cms-store";

export async function GET() {
  const faqs = await getFaqs(false);
  return NextResponse.json({ success: true, data: faqs });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.question || !body.answer) {
      return NextResponse.json({ success: false, message: "Question and answer required" }, { status: 400 });
    }
    const saved = await saveFaq(body);
    return NextResponse.json({ success: true, data: saved });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ success: false, message: "FAQ ID required" }, { status: 400 });
    await deleteFaq(id);
    return NextResponse.json({ success: true, message: "FAQ deleted" });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}

