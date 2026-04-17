export type BookingStatus =
  | "submitted"
  | "under_review"
  | "approved"
  | "declined"
  | "deposit_pending"
  | "deposit_paid"
  | "scheduled";

export type BookingRecord = {
  id: string;
  status: BookingStatus;
  createdAt: string;
  fullName: string;
  email: string;
  phone?: string;
  concept: string;
  placement: string;
  estimatedSize: string;
  styleDirection: string;
  budgetRange: string;
  timeline: string;
  availability: string;
  notes?: string;
  referenceUrls?: string[];
};
