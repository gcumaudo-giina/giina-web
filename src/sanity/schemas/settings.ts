import { defineField, defineType } from "sanity";

export const settingsSchema = defineType({
  name: "settings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "contact",
      title: "Contact",
      type: "object",
      fields: [
        { name: "email", title: "Email", type: "string" },
        { name: "phone", title: "Phone", type: "string" },
        { name: "address", title: "Address", type: "string", description: "e.g. Marbella, Málaga, Spain" },
      ],
    }),
    defineField({
      name: "social",
      title: "Social Media",
      type: "object",
      fields: [
        { name: "instagram", title: "Instagram URL", type: "url" },
        { name: "linkedin",  title: "LinkedIn URL",  type: "url" },
        { name: "pinterest", title: "Pinterest URL", type: "url" },
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO Defaults",
      type: "object",
      fields: [
        { name: "title",       title: "Default Title",       type: "string" },
        { name: "description", title: "Default Description", type: "text", rows: 2 },
        { name: "ogImage",     title: "Default OG Image",    type: "image", options: { hotspot: true } },
      ],
    }),
    defineField({
      name: "legal",
      title: "Legal",
      type: "object",
      fields: [
        { name: "privacy", title: "Privacy Policy URL", type: "url" },
        { name: "cookies", title: "Cookies Policy URL", type: "url" },
        { name: "company", title: "Legal Company Name", type: "string", description: "e.g. Giina Design SL — NIF B22612055" },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});