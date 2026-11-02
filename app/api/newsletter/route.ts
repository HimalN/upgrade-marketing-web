import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const NewsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = NewsletterSchema.parse(body);

    return NextResponse.json({
      success: true,
      message: `Thank you for subscribing! We have added ${validated.email} to our private agency journal.`,
    });
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: err.errors.map((e) => e.message) },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Subscription failed" },
      { status: 500 }
    );
  }
}

