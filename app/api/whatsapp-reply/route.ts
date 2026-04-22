import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const from = formData.get("From");
    const body = formData.get("Body");
    const profileName = formData.get("ProfileName");

    console.log("Incoming WhatsApp Reply:");
    console.log({
      from,
      body,
      profileName,
    });

    /*
      Future Logic Here:

      if body === "DONE"
      → mark healthy

      if body === "MISSED"
      → trigger recovery flow

      if custom excuse message
      → AI analysis + coach alert
    */

    return NextResponse.json({
      success: true,
      message: "Reply received successfully",
    });
  } catch (error: any) {
    console.error("Webhook Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Something went wrong",
      },
      { status: 500 }
    );
  }
}