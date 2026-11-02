import { NextRequest, NextResponse } from "next/server";
import { getTeamMembers, saveTeamMember, deleteTeamMember } from "@/lib/data/cms-store";

export async function GET() {
  const team = await getTeamMembers(false);
  return NextResponse.json({ success: true, data: team });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name || !body.designation) {
      return NextResponse.json({ success: false, message: "Name and designation required" }, { status: 400 });
    }
    const saved = await saveTeamMember(body);
    return NextResponse.json({ success: true, data: saved });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ success: false, message: "Member ID required" }, { status: 400 });
    await deleteTeamMember(id);
    return NextResponse.json({ success: true, message: "Member deleted" });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}

