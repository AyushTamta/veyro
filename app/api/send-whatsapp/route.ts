import { NextResponse } from "next/server";
import twilio from "twilio";

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

    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    const finalMessage =
      message ||
      `Hey ${clientName || "there"} 👋
      
Did you complete your workout today?

Reply:
DONE ✅
or
MISSED ❌

– Team Veyro`;

    const response = await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: `whatsapp:${phone}`,
      body: finalMessage,
    });

    return NextResponse.json({
      success: true,
      sid: response.sid,
    });
  } catch (error: any) {
    console.error("TWILIO ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Something went wrong",
      },
      { status: 500 }
    );
  }
}