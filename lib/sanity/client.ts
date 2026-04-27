import { createClient } from "next-sanity";
import { sanityDataset, sanityProjectId } from "./env";

export const sanityClient = createClient({
  projectId: sanityProjectId || "placeholder",
  dataset: sanityDataset,
  apiVersion: "2024-01-01",
  useCdn: true,
});
