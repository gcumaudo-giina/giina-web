import { defineField, defineType } from "sanity";

export const studioSchema = defineType({
  name: "studio",
  title: "Studio Info",
  type: "document",
  fields: [
    defineField({
      name: "headline",
      title: "Headline",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "string" },
        { name: "es", title: "Español", type: "string" },
      ],
    }),
    defineField({
      name: "philosophy",
      title: "Philosophy / About",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "text", rows: 5 },
        { name: "es", title: "Español", type: "text", rows: 5 },
      ],
    }),
    defineField({
      name: "photo",
      title: "Studio Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "teamMembers",
      title: "Team",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name",  title: "Name",  type: "string" },
            { name: "role",  title: "Role",  type: "string" },
            { name: "photo", title: "Photo", type: "image", options: { hotspot: true } },
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Studio Info" }),
  },
});