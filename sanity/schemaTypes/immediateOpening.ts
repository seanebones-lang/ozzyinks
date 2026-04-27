import { defineField, defineType } from "sanity";

export default defineType({
  name: "immediateOpening",
  title: "Immediate opening",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "sessionDate",
      title: "Session date / window",
      type: "string",
      description: "Free text, e.g. “March 12 afternoon” or “ASAP this week”.",
    }),
    defineField({
      name: "blurb",
      title: "Details",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "active",
      title: "Show on site",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "sortOrder",
      title: "Sort order",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "sessionDate" },
  },
});
