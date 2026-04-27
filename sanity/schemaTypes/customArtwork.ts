import { defineField, defineType } from "sanity";

export default defineType({
  name: "customArtwork",
  title: "Available custom artwork",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "priceLabel",
      title: "Price label",
      type: "string",
      description: "Optional, e.g. “$400” or “Quote on request”.",
    }),
    defineField({
      name: "available",
      title: "Available",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "inquiryLink",
      title: "Inquiry link",
      type: "url",
      description: "Optional external link (e.g. email, form).",
    }),
    defineField({
      name: "sortOrder",
      title: "Sort order",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "priceLabel", media: "image" },
  },
});
