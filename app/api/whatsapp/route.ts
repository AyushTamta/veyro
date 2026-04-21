import { NextResponse } from "next/server";
import { sendCheckinWhatsApp } from "@/lib/twilio";

export async function GET() {
  try {
    await sendCheckinWhatsApp(
      process.env.YOUR_WHATSAPP_NUMBER!,
      "Test Client"
    );

    return NextResponse.json({
      success: true,
      message: "WhatsApp message sent successfully",
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}