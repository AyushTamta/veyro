import Twilio from "twilio";

const client = Twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

export async function sendCheckinSMS(
  to: string,
  clientName: string
) {
  try {
    const message = await client.messages.create({
      body: `Hey ${clientName}, did you complete today's workout?\nReply with: DONE / SKIPPED / NO TIME`,
      from: process.env.TWILIO_PHONE_NUMBER!,
      to,
    });

    return message;
  } catch (error) {
    console.error("Twilio Error:", error);
    throw error;
  }
}