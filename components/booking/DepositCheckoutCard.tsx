"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";

export function DepositCheckoutCard({ bookingId, email }: { bookingId: string; email?: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function pay() {
    setLoading(true);
    setError(null);
    trackEvent("deposit_checkout_opened");
    try {
      const res = await fetch("/api/deposit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId, email }),
      });
      const data = await res.json();
      if (!res.ok || !data.checkoutUrl) {
        throw new Error(data.message || "Could not start checkout");
      }
      window.location.href = data.checkoutUrl as string;
    } catch (e) {
      setLoading(false);
      setError(e instanceof Error ? e.message : "Checkout failed");
    }
  }

  return (
    <div className="glass-panel neon-ring min-w-0 rounded-2xl p-5 sm:p-6">
      <h3 className="font-[family-name:var(--font-syne)] text-lg font-semibold">Pay $100 deposit</h3>
      <p className="mt-2 text-sm text-muted">
        After Ozzy approves your project direction, secure your slot with a non-refundable $100 deposit (applied to your
        final session).
      </p>
      <p className="mt-2 text-xs text-muted">Booking reference: {bookingId}</p>
      <Button type="button" className="mt-4 w-full min-[480px]:w-auto" onClick={pay} disabled={loading}>
        {loading ? "Redirecting…" : "Pay $100 deposit"}
      </Button>
      {error ? <p className="mt-3 text-sm text-red-400">{error}</p> : null}
      <p className="mt-3 break-words text-xs text-muted">
        If checkout is unavailable, configure{" "}
        <code className="break-all text-white/80">STRIPE_SECRET_KEY</code> in production.
      </p>
    </div>
  );
}
