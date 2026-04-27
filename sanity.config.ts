import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";

/** Baked into hosted Studio (`sanity deploy`). Env override optional for forks. */
const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || "na90lju6";
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";

export default defineConfig({
  name: "default",
  title: "Ozzy Inks",
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
