import { NextResponse } from "next/server";

/**
 * Contact form endpoint.
 * Sends email through Resend (https://resend.com, free tier: 3,000 emails/month).
 * Required env vars:  RESEND_API_KEY, CONTACT_TO_EMAIL
 * Optional:           CONTACT_FROM_EMAIL  (default: "Portfolio <onboarding@resend.dev>")
 * If not configured it returns 503 and the form falls back to opening the visitor's mail app.
 */

export const runtime = "nodejs";

const LIMITS = { name: 100, email: 200, projectType: 100, budget: 100, timeline: 100, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Basic per-instance rate limit: 5 messages / 10 min per IP.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot filled in: pretend success so bots learn nothing.
  if (typeof body.company === "string" && body.company.trim()) {
    return NextResponse.json({ ok: true });
  }

  const field = (k: keyof typeof LIMITS) =>
    typeof body[k] === "string" ? (body[k] as string).trim().slice(0, LIMITS[k]) : "";

  const data = {
    name: field("name"),
    email: field("email"),
    projectType: field("projectType"),
    budget: field("budget"),
    timeline: field("timeline"),
    message: field("message"),
  };

  if (!data.name) return NextResponse.json({ error: "Please enter your name." }, { status: 422 });
  if (!EMAIL_RE.test(data.email))
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 422 });
  if (data.message.length < 10)
    return NextResponse.json({ error: "Please tell me a bit more about your project." }, { status: 422 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many messages. Please try again in a few minutes." }, { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    return NextResponse.json({ error: "Email is not configured." }, { status: 503 });
  }

  const rows: [string, string][] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Project", data.projectType || "—"],
    ["Budget", data.budget || "—"],
    ["Timeline", data.timeline || "—"],
  ];

  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${data.message}`;
  const html = `
    <h2 style="font-family:sans-serif">New project inquiry</h2>
    <table style="font-family:sans-serif;border-collapse:collapse">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:4px 12px 4px 0;color:#666">${k}</td><td style="padding:4px 0"><strong>${escapeHtml(v)}</strong></td></tr>`
        )
        .join("")}
    </table>
    <p style="font-family:sans-serif;white-space:pre-wrap;line-height:1.5">${escapeHtml(data.message)}</p>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
        to: [to],
        reply_to: data.email,
        subject: `New inquiry from ${data.name}${data.projectType ? ` (${data.projectType})` : ""}`,
        text,
        html,
      }),
    });

    if (!res.ok) {
      console.error("Resend error", res.status, await res.text());
      return NextResponse.json({ error: "The message couldn't be sent right now." }, { status: 502 });
    }
  } catch (err) {
    console.error("Contact send failed", err);
    return NextResponse.json({ error: "The message couldn't be sent right now." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
