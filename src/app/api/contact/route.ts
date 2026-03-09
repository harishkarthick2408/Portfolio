import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// ---------------------------------------------------------------------------
// Required environment variables (add to .env.local):
//   SMTP_HOST        – e.g. smtp.gmail.com
//   SMTP_PORT        – e.g. 587
//   SMTP_SECURE      – "true" for port 465, "false" otherwise
//   SMTP_USER        – your SMTP username / email address
//   SMTP_PASS        – your SMTP password / app password
//   CONTACT_EMAIL_TO – destination inbox (defaults to SMTP_USER)
// ---------------------------------------------------------------------------

function sanitize(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export async function POST(req: NextRequest) {
  // ── Parse body ────────────────────────────────────────────────────────────
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const { name, email, phone, message } = body as Record<string, unknown>;

  // ── Validate ──────────────────────────────────────────────────────────────
  if (typeof name !== 'string' || !name.trim()) {
    return NextResponse.json({ error: 'Full name is required.' }, { status: 422 });
  }
  if (name.trim().length > 100) {
    return NextResponse.json({ error: 'Name is too long.' }, { status: 422 });
  }
  if (typeof email !== 'string' || !email.trim()) {
    return NextResponse.json({ error: 'Email address is required.' }, { status: 422 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 422 });
  }
  if (typeof message !== 'string' || !message.trim()) {
    return NextResponse.json({ error: 'Message is required.' }, { status: 422 });
  }
  if (message.trim().length > 5000) {
    return NextResponse.json({ error: 'Message is too long (max 5000 chars).' }, { status: 422 });
  }

  // ── Dev fallback: log to console when SMTP is not configured ──────────────
  const smtpConfigured = Boolean(
    process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS,
  );

  if (!smtpConfigured) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Contact Form — Dev Mode]', { name, email, phone, message });
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: 'Email service is not configured.' }, { status: 503 });
  }

  // ── Send email ────────────────────────────────────────────────────────────
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const phoneHtml =
      typeof phone === 'string' && phone.trim()
        ? `<p><strong>Phone:</strong> ${sanitize(phone.trim())}</p>`
        : '';

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL_TO ?? process.env.SMTP_USER,
      replyTo: email,
      subject: `New message from ${sanitize(name.trim())}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a2e;">
          <h2 style="color:#7b61ff;margin-bottom:1.5rem;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${sanitize(name.trim())}</p>
          <p><strong>Email:</strong> ${sanitize(email.trim())}</p>
          ${phoneHtml}
          <p><strong>Message:</strong></p>
          <div style="background:#f5f5f5;padding:1rem 1.25rem;border-radius:8px;
                      white-space:pre-wrap;line-height:1.6;">
            ${sanitize(message.trim())}
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Contact Form Error]', err);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 },
    );
  }
}
