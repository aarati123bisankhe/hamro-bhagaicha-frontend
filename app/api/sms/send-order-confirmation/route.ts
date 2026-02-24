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

  const authToken = request.cookies.get("auth_token")?.value;

  const response = await fetch(`${backendBaseUrl}/api/sms/send-order-confirmation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    },
    body: JSON.stringify(payload),
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
