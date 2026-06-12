import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { schemaTypes } from "./sanity/schemaTypes"

export default defineConfig({
  name: "omkara-commercial",
  title: "OMKARA COMMERCIAL CMS",

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "your-project-id",
  dataset: process.env.SANITY_STUDIO_DATASET || "production",

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
})