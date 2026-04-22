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
  
      // Future AI logic goes here
  
      const twimlResponse = `
        <Response>
          <Message>
            Got it! Your check-in has been recorded ✅
          </Message>
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