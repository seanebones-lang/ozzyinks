"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export function DepositSuccessTracker() {
  useEffect(() => {
    trackEvent("deposit_paid_success");
  }, []);
  return null;
}
