import { NextRequest, NextResponse } from "next/server";
import { getTestimonials, saveTestimonial, deleteTestimonial } from "@/lib/data/cms-store";

export async function GET() {
  const testimonials = await getTestimonials(false);
  return NextResponse.json({ success: true, data: testimonials });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.client_name || !body.feedback) {
      return NextResponse.json({ success: false, message: "Client name and feedback required" }, { status: 400 });
    }
    const saved = await saveTestimonial(body);
    return NextResponse.json({ success: true, data: saved });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ success: false, message: "ID required" }, { status: 400 });
    await deleteTestimonial(id);
    return NextResponse.json({ success: true, message: "Testimonial deleted" });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}

