import { Resend } from "resend";

import { env } from "@/env";

const resend = new Resend(env.RESEND_API_KEY);

export const sendEmail = async (payload: {
  to: string;
  subject: string;
  text: string;
}) => {
  try {
    const response = await resend.emails.send({
      from: "Next Better Admin <onboarding@resend.dev>",
      ...payload,
    });

    if (response?.data) return true;
    return false;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};
