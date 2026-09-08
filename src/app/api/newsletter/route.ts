import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { getClientIp, rateLimit } from "@/lib/rateLimit";

const API_KEY = process.env.MAILCHIMP_API_KEY;
const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
const SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type MailchimpError = { title?: string; detail?: string };

export async function POST(request: Request) {
  if (!API_KEY || !AUDIENCE_ID || !SERVER_PREFIX) {
    return NextResponse.json(
      { message: "The newsletter is not configured yet." },
      { status: 503 }
    );
  }

  const { ok } = rateLimit(`newsletter:${getClientIp(request)}`, {
    limit: 5,
    windowMs: 60_000,
  });

  if (!ok) {
    return NextResponse.json(
      { message: "Too many attempts. Please try again in a minute." },
      { status: 429 }
    );
  }

  let email: unknown;
  let honeypot: unknown;

  try {
    const body: unknown = await request.json();
    email = (body as { email?: unknown })?.email;
    // "company" reads as a normal field name to a form-filling bot; a real
    // visitor never sees or fills it, since NewsletterSignup keeps it
    // visually and semantically hidden.
    honeypot = (body as { company?: unknown })?.company;
  } catch {
    return NextResponse.json(
      { message: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    // Report success so the bot has no signal to adapt against; nothing is
    // actually sent to Mailchimp.
    return NextResponse.json({
      message: "Almost there. Check your inbox to confirm.",
    });
  }

  if (typeof email !== "string" || !EMAIL_PATTERN.test(email.trim())) {
    return NextResponse.json(
      { message: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const normalized = email.trim().toLowerCase();
  const subscriberHash = createHash("md5").update(normalized).digest("hex");

  try {
    // PUT upserts, so a resubscribe after an unsubscribe does not 400.
    // status_if_new is "pending" because the audience uses double opt-in.
    const response = await fetch(
      `https://${SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members/${subscriberHash}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(`anystring:${API_KEY}`).toString(
            "base64"
          )}`,
        },
        body: JSON.stringify({
          email_address: normalized,
          status_if_new: "pending",
        }),
      }
    );

    if (!response.ok) {
      const error: MailchimpError = await response.json().catch(() => ({}));

      if (error.title === "Member Exists") {
        return NextResponse.json({
          message: "You are already subscribed.",
        });
      }

      if (error.title === "Forgotten Email Not Subscribed") {
        return NextResponse.json(
          {
            message:
              "This address was removed before. Please subscribe from the Mailchimp signup form.",
          },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { message: "We could not subscribe you. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      message: "Almost there. Check your inbox to confirm.",
    });
  } catch {
    return NextResponse.json(
      { message: "We could not reach the newsletter service." },
      { status: 502 }
    );
  }
}
