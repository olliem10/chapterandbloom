import { NextResponse } from "next/server";

interface ContactPayload {
  name?: string;
  email?: string;
  orderNumber?: string;
  subject?: string;
  message?: string;
}

/**
 * No email delivery provider is connected yet (Resend/Postmark/SendGrid etc.
 * still to be chosen). This route validates and acknowledges a submission
 * but does not currently deliver it anywhere — wire a real provider here
 * before relying on this form for genuine customer contact.
 */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as ContactPayload | null;

  if (!body) {
    return NextResponse.json({ ok: false, error: "Invalid submission." }, { status: 400 });
  }

  const isValidEmail = typeof body.email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email);

  if (!body.name?.trim() || !isValidEmail || !body.subject?.trim() || !body.message?.trim()) {
    return NextResponse.json({ ok: false, error: "Please fill in all required fields." }, { status: 400 });
  }

  console.log("Contact form submission received (not yet delivered to a mailbox):", {
    name: body.name,
    email: body.email,
    orderNumber: body.orderNumber || undefined,
    subject: body.subject,
  });

  return NextResponse.json({ ok: true, delivered: false });
}
