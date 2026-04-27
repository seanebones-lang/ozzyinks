import { defineField, defineType } from "sanity";

export default defineType({
  name: "portfolioItem",
  title: "Portfolio",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "style",
      title: "Style",
      type: "string",
      description: "Used for filters (e.g. Color, Black & grey, Illustration).",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "placement",
      title: "Placement",
      type: "string",
    }),
    defineField({
      name: "healed",
      title: "Healed",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "sortOrder",
      title: "Sort order",
      type: "number",
      description: "Lower numbers appear first.",
    }),
  ],
  preview: {
    select: { title: "title", media: "image" },
  },
  orderings: [
    {
      title: "Sort order",
      name: "sortOrderAsc",
      by: [{ field: "sortOrder", direction: "asc" }, { field: "_createdAt", direction: "desc" }],
    },
  ],
});
