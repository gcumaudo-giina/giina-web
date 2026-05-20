import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { projectSchema } from "./src/sanity/schemas/project";
import { settingsSchema } from "./src/sanity/schemas/settings";
import { studioSchema } from "./src/sanity/schemas/studio";

export default defineConfig({
  name: "giina-design",
  title: "GIINA Design — CMS",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("GIINA Design")
          .items([
            S.listItem()
              .title("Projects")
              .schemaType("project")
              .child(S.documentTypeList("project").title("All Projects")),
            S.divider(),
            S.listItem()
              .title("Studio Info")
              .schemaType("studio")
              .child(S.document().schemaType("studio").documentId("studio-info")),
            S.listItem()
              .title("Site Settings")
              .schemaType("settings")
              .child(S.document().schemaType("settings").documentId("site-settings")),
          ]),
    }),
  ],
  schema: {
    types: [projectSchema, settingsSchema, studioSchema],
  },
});