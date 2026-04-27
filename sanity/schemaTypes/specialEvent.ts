import { defineField, defineType } from "sanity";

export default defineType({
  name: "specialEvent",
  title: "Special event",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "eventStart",
      title: "Starts",
      type: "datetime",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "eventEnd",
      title: "Ends",
      type: "datetime",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "body",
      title: "Full details",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "ticketUrl",
      title: "Link",
      type: "url",
    }),
    defineField({
      name: "sortOrder",
      title: "Sort order",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "location", media: "image" },
  },
});
