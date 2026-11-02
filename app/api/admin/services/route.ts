import { NextRequest, NextResponse } from "next/server";
import { getServices, saveService, deleteService } from "@/lib/data/cms-store";

export async function GET() {
  const services = await getServices(false);
  return NextResponse.json({ success: true, data: services });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.title || !body.slug) {
      return NextResponse.json(
        { success: false, message: "Title and slug are required" },
        { status: 400 }
      );
    }
    const saved = await saveService(body);
    return NextResponse.json({ success: true, data: saved });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Failed to save service", error: String(err) },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, message: "Service ID required" }, { status: 400 });
    }
    await deleteService(id);
    return NextResponse.json({ success: true, message: "Service deleted successfully" });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Failed to delete service", error: String(err) },
      { status: 500 }
    );
  }
}

