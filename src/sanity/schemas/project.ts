import { defineField, defineType } from "sanity";

export const projectSchema = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "string", validation: (r) => r.required() },
        { name: "es", title: "Español", type: "string" },
      ],
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: { source: "title.en" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "e.g. Marbella, Málaga",
    }),
    defineField({
      name: "services",
      title: "Services Applied",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Concept & Aesthetic Design", value: "concept" },
          { title: "Technical Development", value: "technical" },
          { title: "Selection & Supply", value: "selection" },
          { title: "Works Coordination", value: "coordination" },
        ],
      },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "text", rows: 4 },
        { name: "es", title: "Español", type: "text", rows: 4 },
      ],
    }),
    defineField({
      name: "videoScrub",
      title: "Video (Scrubbing / frame-by-frame scroll)",
      type: "url",
      description: "Cloudinary URL — used for the immersive scroll experience on the project page",
    }),
    defineField({
      name: "videoAmbient",
      title: "Video Ambient (home loop)",
      type: "url",
      description: "Cloudinary URL — muted loop shown on the home project card hover",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt text", type: "string" }],
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Alt text", type: "string" }],
        },
      ],
      description: "Drag to reorder. First image = cover if no cover set.",
    }),
    defineField({
      name: "materials",
      title: "Materials & Finishes",
      type: "array",
      of: [{ type: "string" }],
      description: "e.g. Travertine, Linen, Light oak",
    }),
    defineField({
      name: "brands",
      title: "Brands Involved",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "featured",
      title: "Featured on Home",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Order in Grid",
      type: "number",
      description: "Lower number = shown first",
    }),
  ],
  preview: {
    select: { title: "title.en", media: "coverImage", year: "year" },
    prepare({ title, media, year }) {
      return { title: title ?? "Untitled", subtitle: year?.toString(), media };
    },
  },
  orderings: [
    { title: "Order (manual)", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
    { title: "Year (newest)", name: "yearDesc", by: [{ field: "year", direction: "desc" }] },
  ],
});