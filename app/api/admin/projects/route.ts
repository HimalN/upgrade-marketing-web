import { NextRequest, NextResponse } from "next/server";
import { getProjects, saveProject, deleteProject } from "@/lib/data/cms-store";

export async function GET() {
  const projects = await getProjects(false);
  return NextResponse.json({ success: true, data: projects });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.title || !body.slug || !body.category_id) {
      return NextResponse.json(
        { success: false, message: "Title, slug, and category are required" },
        { status: 400 }
      );
    }
    const saved = await saveProject(body);
    return NextResponse.json({ success: true, data: saved });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Failed to save project", error: String(err) },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, message: "Project ID required" }, { status: 400 });
    }
    await deleteProject(id);
    return NextResponse.json({ success: true, message: "Project deleted successfully" });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Failed to delete project", error: String(err) },
      { status: 500 }
    );
  }
}

