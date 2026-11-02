import { NextRequest, NextResponse } from "next/server";
import { getContactInquiries, updateInquiryStatus, deleteContactInquiry } from "@/lib/data/cms-store";
import { InquiryStatus } from "@/lib/types/database";

export async function GET() {
  const inquiries = await getContactInquiries();
  return NextResponse.json({ success: true, data: inquiries });
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ success: false, message: "ID and status required" }, { status: 400 });
    }
    await updateInquiryStatus(id, status as InquiryStatus);
    return NextResponse.json({ success: true, message: "Inquiry status updated" });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ success: false, message: "Inquiry ID required" }, { status: 400 });
    await deleteContactInquiry(id);
    return NextResponse.json({ success: true, message: "Inquiry deleted" });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}

