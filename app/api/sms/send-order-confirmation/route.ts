import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const backendBaseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!backendBaseUrl) {
    return NextResponse.json(
      { success: false, message: "Backend API URL is not configured" },
      { status: 500 }
    );
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body" },
      { status: 400 }
    );
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return NextResponse.json(
      { success: false, message: "Request body must be an object" },
      { status: 400 }
    );
  }

  const body = payload as Record<string, unknown>;
  const normalizedTo =
    (typeof body.to === "string" && body.to.trim()) ||
    (typeof body.phone === "string" && body.phone.trim()) ||
    (typeof body.phoneNumber === "string" && body.phoneNumber.trim());

  if (!normalizedTo) {
    return NextResponse.json(
      { success: false, message: "Missing SMS recipient (to/phone/phoneNumber)" },
      { status: 400 }
    );
  }

  const authToken = request.cookies.get("auth_token")?.value;

  const response = await fetch(`${backendBaseUrl}/api/sms/send-order-confirmation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    },
    body: JSON.stringify({
      ...body,
      to: normalizedTo,
    }),
    cache: "no-store",
  });

  const text = await response.text();

  let data: unknown = null;
  try {
    data = text ? (JSON.parse(text) as unknown) : null;
  } catch {
    data = { raw: text };
  }

  if (!response.ok) {
    return NextResponse.json(
      {
        success: false,
        message: "Backend SMS request failed",
        status: response.status,
        detail: data,
      },
      { status: response.status }
    );
  }

  return NextResponse.json(data ?? { success: true });
}
