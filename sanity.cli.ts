import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId:
      process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || "na90lju6",
    dataset:
      process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production",
  },
  deployment: {
    appId: "jquflgffkjefc6pld0kf7bjp",
  },
});
