import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const from = formData.get("From") as string;
    const body = formData.get("Body") as string;

    if (!from || !body) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing Twilio payload",
        },
        { status: 400 }
      );
    }

    const normalizedReply = body.trim().toUpperCase();

    let status = "at_risk";

    if (normalizedReply === "DONE") {
      status = "healthy";
    }

    if (
      normalizedReply === "SKIPPED" ||
      normalizedReply === "NO TIME"
    ) {
      status = "warning";
    }

    const { error } = await supabase
      .from("client_checkins")
      .insert([
        {
          client_phone: from,
          client_name: "Auto-detected",
          response: normalizedReply,
          status,
          replied_at: new Date().toISOString(),
        },
      ]);

    if (error) {
      console.error(error.message);

      return NextResponse.json(
        {
          success: false,
          message: "Database insert failed",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Reply tracked successfully",
      reply: normalizedReply,
      status,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Webhook failed",
      },
      { status: 500 }
    );
  }
}