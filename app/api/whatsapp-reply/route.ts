export async function POST(req: Request) {
    try {
      const formData = await req.formData();
  
      const from = String(formData.get("From") || "");
      const body = String(formData.get("Body") || "").trim().toUpperCase();
      const profileName = String(formData.get("ProfileName") || "Client");
  
      console.log("Incoming WhatsApp Reply:", {
        from,
        body,
        profileName,
      });
  
      let replyMessage = "";
  
      if (body === "DONE") {
        replyMessage = `Amazing work 🔥
  
  Consistency builds real results.
  
  Keep going strong for tomorrow 💪`;
      }
  
      else if (body === "MISSED") {
        replyMessage = `That’s okay — one missed day doesn’t define your journey.
  
  Let’s reset tomorrow and get back on track 💪`;
      }
  
      else {
        replyMessage = `Totally understandable — busy days happen.
  
  What matters most is getting back quickly, not being perfect.
  
  Let’s aim for a strong comeback tomorrow 🚀`;
      }
  
      const twimlResponse = `
        <Response>
          <Message>${replyMessage}</Message>
        </Response>
      `;
  
      return new Response(twimlResponse, {
        status: 200,
        headers: {
          "Content-Type": "text/xml",
        },
      });
    } catch (error: any) {
      console.error("Webhook Error:", error);
  
      const errorResponse = `
        <Response>
          <Message>
            Something went wrong. Please try again later.
          </Message>
        </Response>
      `;
  
      return new Response(errorResponse, {
        status: 200,
        headers: {
          "Content-Type": "text/xml",
        },
      });
    }
  }