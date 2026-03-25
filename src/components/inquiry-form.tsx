"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type InquiryFormProps = {
  subject: string;
};

export function InquiryForm({ subject }: InquiryFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [notice, setNotice] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const isReady = useMemo(() => {
    return name.trim().length > 1 && email.trim().length > 4 && message.trim().length > 2;
  }, [email, message, name]);

  return (
    <form
      className="space-y-4"
      onSubmit={async (event) => {
        event.preventDefault();

        if (!isReady) {
          setNotice("Prosím doplňte meno, email a krátku správu.");
          setStatus("error");
          return;
        }

        try {
          setStatus("submitting");
          setNotice("");

          const response = await fetch("/api/contact", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              subject,
              name: name.trim(),
              email: email.trim(),
              message: message.trim(),
            }),
          });

          const payload = (await response.json()) as { message?: string };

          if (!response.ok) {
            throw new Error(payload.message ?? "Správu sa nepodarilo odoslať.");
          }

          setStatus("success");
          setNotice("Správa bola úspešne odoslaná. Ozveme sa vám čo najskôr.");
          setName("");
          setEmail("");
          setMessage("");
        } catch (error) {
          setStatus("error");
          setNotice(
            error instanceof Error
              ? error.message
              : "Nastala chyba pri odosielaní formulára. Skúste to prosím znova."
          );
        }
      }}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-[color:var(--forest)]">Meno</span>
          <input
            className="field"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Vaše meno"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-[color:var(--forest)]">Email</span>
          <input
            className="field"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            placeholder="vas@email.sk"
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-[color:var(--forest)]">Správa</span>
        <textarea
          className="field min-h-36 resize-y"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Napíšte, o ktorú službu máte záujem a aký termín vám vyhovuje."
        />
      </label>

      <div className="flex flex-col gap-3">
        <button
          type="submit"
          className="button-primary border-0 sm:self-start"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Odosielam..." : "Odoslať dopyt"}
        </button>
        <p className="text-sm leading-6 text-[color:var(--muted)]">
          Odoslaním súhlasíte so spracovaním osobných údajov.{" "}
          <Link
            href="/ochrana-osobnych-udajov/"
            className="font-semibold text-[color:var(--forest)] underline decoration-[rgba(49,71,51,0.35)] underline-offset-4"
          >
            Zásady ochrany osobných údajov
          </Link>
        </p>
      </div>

      {notice ? (
        <p
          className={`text-sm ${
            status === "success" ? "text-[color:var(--forest)]" : "text-[color:var(--clay)]"
          }`}
        >
          {notice}
        </p>
      ) : null}
    </form>
  );
}
