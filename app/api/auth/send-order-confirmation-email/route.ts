import { NextResponse } from "next/server";

type EmailPayload = {
  email: string;
  customerName: string;
  orderId: string;
  total: number;
};

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.ORDER_EMAIL_FROM;

  if (!resendApiKey || !fromEmail) {
    return NextResponse.json(
      { success: false, message: "Email service is not configured" },
      { status: 500 }
    );
  }

  let body: EmailPayload;

  try {
    body = (await request.json()) as EmailPayload;
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body" },
      { status: 400 }
    );
  }

  if (!body.email || !body.customerName || !body.orderId) {
    return NextResponse.json(
      { success: false, message: "Missing email payload fields" },
      { status: 400 }
    );
  }

  const customerName = escapeHtml(body.customerName);
  const orderId = escapeHtml(body.orderId);

  const emailResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [body.email],
      subject: `Order Confirmed: ${body.orderId}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #1c1c1c;">
          <h2 style="color: #1f4f2a;">Order Confirmation</h2>
          <p>Hello ${customerName},</p>
          <p>Your order <strong>${orderId}</strong> has been confirmed.</p>
          <p>Total Amount: <strong>NPR ${body.total}</strong></p>
          <p>Thank you for shopping with Hamro Bhagaicha.</p>
        </div>
      `,
    }),
    cache: "no-store",
  });

  if (!emailResponse.ok) {
    const detail = await emailResponse.text();
    return NextResponse.json(
      { success: false, message: "Failed to send confirmation email", detail },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true });
}
