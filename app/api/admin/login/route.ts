import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const expectedEmail = process.env.ADMIN_EMAIL || "admin@upgrademarketing.agency";
    const expectedPassword = process.env.ADMIN_PASSWORD || "UpgradeMaster2026!";

    if (email === expectedEmail && password === expectedPassword) {
      const response = NextResponse.json({
        success: true,
        user: {
          email,
          role: "super_admin",
          name: "Agency Administrator",
        },
      });

      // Set cookie for 7 days
      response.cookies.set("upgrade_admin_token", "authenticated-super-admin-token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: "Invalid administrative credentials." },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Server error during authentication." },
      { status: 500 }
    );
  }
}

