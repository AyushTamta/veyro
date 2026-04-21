import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendCheckinSMS } from "@/lib/twilio";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    console.log("Starting automated check-ins...");

    const { data: clients, error } = await supabase
      .from("clients")
      .select("*");

    if (error) {
      console.error("Supabase Error:", error.message);

      return NextResponse.json(
        {
          success: false,
          source: "supabase",
          error: error.message,
        },
        { status: 500 }
      );
    }

    if (!clients || clients.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No clients found",
      });
    }

    for (const client of clients) {
      try {
        console.log(
          `Sending SMS to ${client.full_name} - ${client.phone}`
        );

        await sendCheckinSMS(
          client.phone,
          client.full_name
        );
      } catch (twilioError: any) {
        console.error(
          `Twilio Error for ${client.full_name}:`,
          twilioError.message
        );

        return NextResponse.json(
          {
            success: false,
            source: "twilio",
            client: client.full_name,
            error: twilioError.message,
          },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: "Daily check-ins sent successfully",
      totalClients: clients.length,
    });
  } catch (error: any) {
    console.error("System Error:", error.message);

    return NextResponse.json(
      {
        success: false,
        source: "system",
        error: error.message,
      },
      { status: 500 }
    );
  }
}