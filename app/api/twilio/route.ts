import { NextResponse } from "next/server";
import { sendCheckinSMS } from "@/lib/twilio";

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

    await sendCheckinSMS(phone, fullName);

    return NextResponse.json({
      success: true,
      message: "Check-in SMS sent successfully",
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