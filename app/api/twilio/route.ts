import { NextResponse } from "next/server";
import { sendCheckinSMS } from "@/lib/twilio";

export async function GET() {
  try {
    await sendCheckinSMS(
      "+919990833893",
      "Test Client"
    );

    return NextResponse.json({
      success: true,
      message: "SMS sent successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send SMS",
      },
      { status: 500 }
    );
  }
}