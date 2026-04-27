import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { sanityDataset, sanityProjectId } from "./env";

const builder = createImageUrlBuilder({
  projectId: sanityProjectId || "placeholder",
  dataset: sanityDataset,
});

export function urlForImage(source: SanityImageSource | null | undefined) {
  if (!source) return null;
  return builder.image(source);
}
