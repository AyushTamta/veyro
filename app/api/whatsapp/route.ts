import { NextResponse } from "next/server";
import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { phone, clientName, message } = body;

    if (!phone) {
      return NextResponse.json(
        {
          success: false,
          message: "Phone number is required",
        },
        { status: 400 }
      );
    }

    const finalMessage =
      message ||
      `Hey ${clientName || "there"} 👋

Just checking in on your workout progress today.

Did you complete your workout?

Reply:
DONE ✅
or
MISSED ❌

– Team Veyro`;

    const response = await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER!,
      to: `whatsapp:${phone}`,
      body: finalMessage,
    });

    return NextResponse.json({
      success: true,
      message: "WhatsApp sent successfully",
      sid: response.sid,
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