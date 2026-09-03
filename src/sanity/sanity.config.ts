import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dataset, projectId } from "@/lib/sanity/client";
import { schemaTypes } from "@/lib/sanity/schemas";

export default defineConfig({
  name: "kovalab",
  title: "KovaLab",
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [structureTool()],
});
