import { NextResponse } from "next/server";

import { contactDetails } from "@/lib/content";

type ContactPayload = {
  subject?: string;
  name?: string;
  email?: string;
  message?: string;
};

function buildTextBody(payload: Required<ContactPayload>) {
  return [
    `Predmet: ${payload.subject}`,
    `Meno: ${payload.name}`,
    `Email: ${payload.email}`,
    "",
    "Sprava:",
    payload.message,
  ].join("\n");
}

function buildHtmlBody(payload: Required<ContactPayload>) {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1a261d;">
      <h2 style="margin: 0 0 16px;">Novy dopyt z webu</h2>
      <p><strong>Predmet:</strong> ${payload.subject}</p>
      <p><strong>Meno:</strong> ${payload.name}</p>
      <p><strong>Email:</strong> ${payload.email}</p>
      <p><strong>Sprava:</strong></p>
      <p>${payload.message.replace(/\n/g, "<br />")}</p>
    </div>
  `;
}

export async function POST(request: Request) {
  const payload = (await request.json()) as ContactPayload;
  const normalized = {
    subject: payload.subject?.trim() || "Dopyt z webu",
    name: payload.name?.trim() || "",
    email: payload.email?.trim() || "",
    message: payload.message?.trim() || "",
  };

  if (
    normalized.name.length < 2 ||
    normalized.email.length < 5 ||
    normalized.message.length < 3
  ) {
    return NextResponse.json(
      { message: "Prosím doplňte meno, email a krátku správu." },
      { status: 400 }
    );
  }

  const apiKey = process.env.SMTP2GO_API_KEY;
  const sender = process.env.SMTP2GO_SENDER ?? process.env.SMTP2GO_SENDER_EMAIL;
  const recipient =
    process.env.CONTACT_EMAIL ?? process.env.SMTP2GO_TO_EMAIL ?? contactDetails.email;

  if (!apiKey || !sender) {
    return NextResponse.json(
      {
        message:
          "Formulár zatiaľ nie je nakonfigurovaný. Doplnte SMTP2GO údaje do premenných prostredia.",
      },
      { status: 500 }
    );
  }

  const response = await fetch("https://api.smtp2go.com/v3/email/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Smtp2go-Api-Key": apiKey,
    },
    body: JSON.stringify({
      sender,
      to: [recipient],
      subject: `${normalized.subject} | ${normalized.name}`,
      text_body: buildTextBody(normalized),
      html_body: buildHtmlBody(normalized),
      custom_headers: [
        {
          header: "Reply-To",
          value: normalized.email,
        },
      ],
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { message: "Správu sa nepodarilo odoslať. Skúste to prosím znova." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
