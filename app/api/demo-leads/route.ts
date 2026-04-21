import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      fullName,
      phone,
      businessType,
      monthlyClients,
      retentionProblem,
    } = body;

    if (
      !fullName ||
      !phone ||
      !businessType ||
      !monthlyClients ||
      !retentionProblem
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill all fields",
        },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("demo_leads")
      .insert([
        {
          full_name: fullName,
          phone,
          business_type: businessType,
          monthly_clients: monthlyClients,
          retention_problem: retentionProblem,
        },
      ]);

    if (error) {
      console.error(error);

      return NextResponse.json(
        {
          success: false,
          message: "Failed to save lead",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Demo lead saved successfully",
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Something went wrong",
      },
      { status: 500 }
    );
  }
}