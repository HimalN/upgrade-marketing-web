import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { saveContactInquiry } from "@/lib/data/cms-store";

const InquirySchema = z.object({
  full_name: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please provide a valid email address"),
  phone_number: z.string().optional(),
  company_name: z.string().optional(),
  service_interested: z.string().min(1, "Please select a service"),
  estimated_budget: z.string().optional(),
  project_description: z.string().min(10, "Please describe your project (at least 10 characters)"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = InquirySchema.parse(body);

    const saved = await saveContactInquiry({
      full_name: validated.full_name,
      email: validated.email,
      phone_number: validated.phone_number,
      company_name: validated.company_name,
      service_interested: validated.service_interested,
      estimated_budget: validated.estimated_budget,
      project_description: validated.project_description,
    });

    return NextResponse.json({
      success: true,
      message: "Thank you for reaching out to Upgrade Marketing Agency. We will review your inquiry and connect with you shortly.",
      inquiry: saved,
    });
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: err.errors.map((e) => e.message) },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Internal server error submitting inquiry" },
      { status: 500 }
    );
  }
}

