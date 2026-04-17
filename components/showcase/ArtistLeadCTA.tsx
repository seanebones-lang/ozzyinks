"use client";

import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";

const LEAD_EMAIL = "nextelevenstudios@gmail.com";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  studioOrCity: z.string().min(2),
  message: z.string().max(2000).optional(),
});

function mailtoLeadHref(data: z.infer<typeof schema>) {
  const subject = `Artist website inquiry — ${data.name}`;
  const body = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Studio or city: ${data.studioOrCity}`,
    "",
    data.message ? `Message:\n${data.message}` : "",
  ].join("\n");
  const safeBody = body.length > 1800 ? `${body.slice(0, 1797)}...` : body;
  return `mailto:${LEAD_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(safeBody)}`;
}

export function ArtistLeadCTA() {
  const [status, setStatus] = useState<"idle" | "ok">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      studioOrCity: String(form.get("studioOrCity") || ""),
      message: String(form.get("message") || "") || undefined,
    };
    const parsed = schema.safeParse(payload);
    if (!parsed.success) {
      const f: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        f[issue.path[0] as string] = issue.message;
      }
      setErrors(f);
      return;
    }
    trackEvent("nexteleven_lead_submitted");
    window.location.href = mailtoLeadHref(parsed.data);
    setStatus("ok");
    e.currentTarget.reset();
  }

  return (
    <section className="min-w-0 rounded-3xl border border-[var(--pink)]/30 bg-black/40 p-5 sm:p-8 md:p-10">
      <div className="grid min-w-0 gap-8 lg:grid-cols-2 lg:items-center">
        <div className="min-w-0">
          <h2 className="break-words font-[family-name:var(--font-syne)] text-xl font-bold min-[400px]:text-2xl sm:text-3xl">
            Tattoo artist? Want a site that books while you tattoo?
          </h2>
          <p className="mt-3 text-sm text-muted">
            We build high-conversion artist websites with cinematic design, AI concierge, and deposit-ready booking
            flows.
          </p>
        </div>
        <form onSubmit={onSubmit} className="min-w-0 space-y-3">
          <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2">
            <Field label="Name" name="name" error={errors.name} />
            <Field label="Email" name="email" type="email" error={errors.email} />
          </div>
          <Field label="Studio or city" name="studioOrCity" error={errors.studioOrCity} />
          <div>
            <label className="text-xs font-medium text-muted" htmlFor="msg">
              Message (optional)
            </label>
            <textarea
              id="msg"
              name="message"
              rows={3}
              className="form-control mt-1 w-full rounded-xl border border-white/15 bg-black/40 px-3 py-3 text-white outline-none ring-0 focus:border-[var(--pink)] md:py-2"
            />
          </div>
          <Button type="submit" className="w-full min-[480px]:w-auto">
            Get my artist site
          </Button>
          {status === "ok" ? (
            <p className="text-sm text-green-400">
              Your email app should have opened with a draft to {LEAD_EMAIL}. If it did not, email us there directly.
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
}) {
  return (
    <div>
      <label className="text-xs font-medium text-muted" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className="form-control mt-1 w-full rounded-xl border border-white/15 bg-black/40 px-3 py-3 text-white outline-none focus:border-[var(--pink)] md:py-2"
      />
      {error ? <p className="mt-1 text-xs text-red-400">{error}</p> : null}
    </div>
  );
}
