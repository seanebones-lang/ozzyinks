import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Policies",
  description: "Deposit, cancellation, privacy, and age requirements for Ozzy Fox bookings.",
};

export default function PoliciesPage() {
  return (
    <div className="mx-auto min-w-0 max-w-3xl px-3 py-12 sm:px-4 sm:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--pink)]">Legal</p>
      <h1 className="break-words font-[family-name:var(--font-syne)] text-3xl font-bold min-[400px]:text-4xl sm:text-5xl">
        Policies
      </h1>
      <div className="mt-8 space-y-10 text-sm leading-relaxed text-white/90 sm:mt-10">
        <section className="min-w-0">
          <h2 className="break-words font-[family-name:var(--font-syne)] text-xl font-semibold text-white">
            Age requirement
          </h2>
          <p className="mt-2 text-muted">
            You must be 18+ with valid government ID at the time of your appointment.
          </p>
        </section>
        <section className="min-w-0">
          <h2 className="break-words font-[family-name:var(--font-syne)] text-xl font-semibold text-white">
            Deposit policy
          </h2>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-muted">
            <li>A $100 non-refundable deposit is required to secure all approved tattoo appointments.</li>
            <li>The deposit is applied toward the final session total.</li>
            <li>Need to reschedule? Please give at least 48 hours’ notice to transfer your deposit to a new date.</li>
            <li>
              Cancellations or reschedule requests made with less than 48 hours’ notice may forfeit the deposit.
            </li>
            <li>No-shows forfeit the deposit and require a new deposit to rebook.</li>
            <li>Deposits reserve artist time, drawing/prep time, and your calendar slot.</li>
          </ul>
        </section>
        <section className="min-w-0">
          <h2 className="break-words font-[family-name:var(--font-syne)] text-xl font-semibold text-white">Privacy</h2>
          <p className="mt-2 text-muted">
            Booking form data is used to evaluate your project and contact you about scheduling. Do not submit medical
            information. For questions about data handling, contact the studio directly.
          </p>
        </section>
        <section className="min-w-0">
          <h2 className="break-words font-[family-name:var(--font-syne)] text-xl font-semibold text-white">Analytics</h2>
          <p className="mt-2 text-muted">
            This site may use privacy-friendly analytics to improve performance and conversion. You can disable trackers
            in your browser if desired.
          </p>
        </section>
      </div>
    </div>
  );
}
