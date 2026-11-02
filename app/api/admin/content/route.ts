import { NextRequest, NextResponse } from "next/server";
import {
  getHomepageSections,
  updateHomepageSection,
  getStatistics,
  saveStatistic,
} from "@/lib/data/cms-store";

export async function GET() {
  const [sections, statistics] = await Promise.all([
    getHomepageSections(),
    getStatistics(),
  ]);
  return NextResponse.json({ success: true, sections, statistics });
}

export async function POST(req: NextRequest) {
  try {
    const { type, data } = await req.json();
    if (type === "section") {
      const updated = await updateHomepageSection(data.section_key, data);
      return NextResponse.json({ success: true, data: updated });
    } else if (type === "statistic") {
      const updated = await saveStatistic(data);
      return NextResponse.json({ success: true, data: updated });
    }
    return NextResponse.json({ success: false, message: "Invalid type" }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}

