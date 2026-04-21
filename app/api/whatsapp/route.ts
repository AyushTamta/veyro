import { NextResponse } from "next/server";
import { sendCheckinWhatsApp } from "@/lib/twilio";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { phone, fullName } = body;

    if (!phone || !fullName) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing phone or client name",
        },
        { status: 400 }
      );
    }

    await sendCheckinWhatsApp(
      phone,
      fullName
    );

    return NextResponse.json({
      success: true,
      message: "WhatsApp sent successfully",
    });
  } catch (error: any) {
    console.error("WhatsApp Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to send WhatsApp",
      },
      { status: 500 }
    );
  }
}