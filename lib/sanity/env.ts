export function isSanityConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() &&
      process.env.NEXT_PUBLIC_SANITY_DATASET?.trim(),
  );
}

export const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || "";
export const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";
