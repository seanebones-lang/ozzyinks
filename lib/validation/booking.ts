import { z } from "zod";

export const bookingSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  concept: z.string().min(10, "Please describe your idea (at least 10 characters)"),
  placement: z.string().min(2, "Placement is required"),
  estimatedSize: z.string().min(1, "Estimated size is required"),
  styleDirection: z.string().min(2, "Style direction is required"),
  budgetRange: z.string().min(1, "Budget range is required"),
  timeline: z.string().min(1, "Timeline is required"),
  availability: z.string().min(3, "Availability is required"),
  notes: z.string().optional(),
  referenceUrls: z.array(z.string().url()).optional(),
  consentDeposit: z
    .boolean()
    .refine((v) => v === true, { message: "You must accept the deposit policy" }),
  consentAge18: z.boolean().refine((v) => v === true, { message: "You must confirm you are 18+" }),
  consentPolicy: z
    .boolean()
    .refine((v) => v === true, { message: "You must accept the cancellation policy" }),
  website: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.website && data.website.length > 0) {
    ctx.addIssue({ code: "custom", message: "Rejected", path: ["website"] });
  }
});

export type BookingInput = z.infer<typeof bookingSchema>;
