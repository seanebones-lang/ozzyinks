"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema, type BookingInput } from "@/lib/validation/booking";
import { Button } from "@/components/ui/Button";
import { DepositCheckoutCard } from "@/components/booking/DepositCheckoutCard";
import { trackEvent } from "@/lib/analytics";

const steps = ["Project", "Contact", "Policies & send"] as const;

export function BookingIntakeForm() {
  const [step, setStep] = useState(0);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      concept: "",
      placement: "",
      estimatedSize: "",
      styleDirection: "",
      budgetRange: "",
      timeline: "",
      availability: "",
      notes: "",
      referenceUrls: undefined,
      consentDeposit: false,
      consentAge18: false,
      consentPolicy: false,
      website: "",
    },
    mode: "onBlur",
  });

  const { register, handleSubmit, formState, trigger, setValue, getValues } = form;

  async function nextFromProject() {
    const ok = await trigger(["concept", "placement", "estimatedSize", "styleDirection", "budgetRange", "timeline", "availability", "notes", "referenceUrls"]);
    if (ok) setStep(1);
  }

  async function nextFromContact() {
    const ok = await trigger(["fullName", "email", "phone"]);
    if (ok) setStep(2);
  }

  async function onValid(data: BookingInput) {
    setServerError(null);
    trackEvent("booking_form_submitted");
    try {
      const { website, ...rest } = data;
      const payload = {
        ...rest,
        website: website ?? "",
        referenceUrls: rest.referenceUrls?.filter(Boolean),
      };
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        trackEvent("booking_form_validation_error");
        setServerError(json.message || "Could not submit");
        return;
      }
      setBookingId(json.bookingId as string);
    } catch {
      setServerError("Network error — try again.");
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
        {steps.map((label, i) => (
          <div
            key={label}
            className={`min-w-0 rounded-full border px-3 py-1.5 sm:py-1 ${i === step ? "border-[var(--pink)] text-[var(--pink)]" : "border-white/15"}`}
          >
            {i + 1}. {label}
          </div>
        ))}
        {bookingId ? (
          <div className="rounded-full border border-green-500/40 px-3 py-1 text-green-400">4. Deposit</div>
        ) : null}
      </div>

      <form
        className="space-y-6"
        onSubmit={handleSubmit(onValid)}
        onFocus={() => trackEvent("booking_form_started")}
      >
        {/* honeypot */}
        <input type="text" tabIndex={-1} autoComplete="off" className="sr-only" aria-hidden {...register("website")} />

        {step === 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Tattoo concept" error={formState.errors.concept?.message}>
              <textarea rows={4} className={inputClass} {...register("concept")} />
            </Field>
            <Field label="Placement on body" error={formState.errors.placement?.message}>
              <input className={inputClass} {...register("placement")} />
            </Field>
            <Field label="Estimated size" error={formState.errors.estimatedSize?.message}>
              <input className={inputClass} {...register("estimatedSize")} placeholder='e.g. "6x4 inches"' />
            </Field>
            <Field label="Style direction" error={formState.errors.styleDirection?.message}>
              <input className={inputClass} {...register("styleDirection")} />
            </Field>
            <Field label="Budget range" error={formState.errors.budgetRange?.message}>
              <select className={inputClass} {...register("budgetRange")}>
                <option value="">Select…</option>
                <option>$300–$600</option>
                <option>$600–$1200</option>
                <option>$1200–$2500</option>
                <option>$2500+</option>
                <option>Not sure yet</option>
              </select>
            </Field>
            <Field label="Preferred timeline" error={formState.errors.timeline?.message}>
              <select className={inputClass} {...register("timeline")}>
                <option value="">Select…</option>
                <option>ASAP</option>
                <option>This month</option>
                <option>Next 1–3 months</option>
                <option>Flexible</option>
              </select>
            </Field>
            <Field className="md:col-span-2" label="Availability" error={formState.errors.availability?.message}>
              <textarea rows={3} className={inputClass} {...register("availability")} />
            </Field>
            <Field className="md:col-span-2" label="Reference image URLs (optional, one per line)" error={undefined}>
              <textarea
                rows={2}
                className={inputClass}
                onChange={(e) => {
                  const lines = e.target.value
                    .split("\n")
                    .map((s) => s.trim())
                    .filter(Boolean);
                  const urls = lines.filter((l) => /^https?:\/\//i.test(l));
                  setValue("referenceUrls", urls.length ? urls : undefined);
                }}
              />
            </Field>
            <Field className="md:col-span-2" label="Anything else we should know?" error={undefined}>
              <textarea rows={3} className={inputClass} {...register("notes")} />
            </Field>
            <div className="md:col-span-2">
              <Button type="button" className="w-full min-[400px]:w-auto" onClick={nextFromProject}>
                Continue
              </Button>
            </div>
          </div>
        ) : null}

        {step === 1 ? (
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Full name" error={formState.errors.fullName?.message}>
              <input className={inputClass} autoComplete="name" {...register("fullName")} />
            </Field>
            <Field label="Email" error={formState.errors.email?.message}>
              <input className={inputClass} type="email" autoComplete="email" {...register("email")} />
            </Field>
            <Field className="md:col-span-2" label="Phone (optional)" error={formState.errors.phone?.message}>
              <input className={inputClass} type="tel" autoComplete="tel" {...register("phone")} />
            </Field>
            <div className="flex flex-col gap-3 min-[400px]:flex-row min-[400px]:flex-wrap md:col-span-2">
              <Button type="button" variant="ghost" className="w-full min-[400px]:w-auto" onClick={() => setStep(0)}>
                Back
              </Button>
              <Button type="button" className="w-full min-[400px]:w-auto" onClick={nextFromContact}>
                Continue
              </Button>
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="space-y-4">
            <label className="flex cursor-pointer items-start gap-3 text-sm text-white/90">
              <input type="checkbox" className="mt-0.5 h-5 w-5 shrink-0 rounded border-white/30" {...register("consentDeposit")} />
              <span>I understand a $100 non-refundable deposit is required to confirm an approved booking.</span>
            </label>
            {formState.errors.consentDeposit ? (
              <p className="text-xs text-red-400">{formState.errors.consentDeposit.message as string}</p>
            ) : null}
            <label className="flex cursor-pointer items-start gap-3 text-sm text-white/90">
              <input type="checkbox" className="mt-0.5 h-5 w-5 shrink-0 rounded border-white/30" {...register("consentAge18")} />
              <span>I confirm I am 18+ with valid ID at appointment time.</span>
            </label>
            {formState.errors.consentAge18 ? (
              <p className="text-xs text-red-400">{formState.errors.consentAge18.message as string}</p>
            ) : null}
            <label className="flex cursor-pointer items-start gap-3 text-sm text-white/90">
              <input type="checkbox" className="mt-0.5 h-5 w-5 shrink-0 rounded border-white/30" {...register("consentPolicy")} />
              <span>I have read and accept the cancellation/reschedule policy.</span>
            </label>
            {formState.errors.consentPolicy ? (
              <p className="text-xs text-red-400">{formState.errors.consentPolicy.message as string}</p>
            ) : null}
            <div className="flex flex-col gap-3 min-[400px]:flex-row">
              <Button type="button" variant="ghost" className="w-full min-[400px]:w-auto" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button type="submit" className="w-full min-[400px]:w-auto">
                Submit tattoo request
              </Button>
            </div>
            {serverError ? <p className="text-sm text-red-400">{serverError}</p> : null}
          </div>
        ) : null}
      </form>

      {bookingId ? (
        <div className="space-y-4">
          <div className="rounded-2xl border border-green-500/30 bg-green-500/5 p-4 text-sm leading-relaxed text-green-100">
            Request received. Ozzy will review your submission and contact you with next steps. Booking reference:{" "}
            <span className="break-all font-mono text-white">{bookingId}</span>
          </div>
          <DepositCheckoutCard bookingId={bookingId} email={getValues("email")} />
        </div>
      ) : null}
    </div>
  );
}

const inputClass =
  "form-control mt-1 w-full rounded-xl border border-white/15 bg-black/40 px-3 py-3 text-white outline-none focus:border-[var(--pink)] md:py-2";

function Field({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="text-xs font-medium text-muted">{label}</label>
      {children}
      {error ? <p className="mt-1 text-xs text-red-400">{error}</p> : null}
    </div>
  );
}
