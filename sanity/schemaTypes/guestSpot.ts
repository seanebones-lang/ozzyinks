import { defineField, defineType } from "sanity";

export default defineType({
  name: "guestSpot",
  title: "Guest spot",
  type: "document",
  fields: [
    defineField({
      name: "shopName",
      title: "Shop / host",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "region",
      title: "Region / state",
      type: "string",
    }),
    defineField({
      name: "country",
      title: "Country",
      type: "string",
    }),
    defineField({
      name: "startDate",
      title: "Start date",
      type: "date",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "endDate",
      title: "End date",
      type: "date",
    }),
    defineField({
      name: "notes",
      title: "Notes",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "bookingUrl",
      title: "Booking link",
      type: "url",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "sortOrder",
      title: "Sort order",
      type: "number",
    }),
  ],
  preview: {
    select: {
      title: "shopName",
      city: "city",
      start: "startDate",
      media: "image",
    },
    prepare({ title, city, start, media }) {
      return {
        title,
        subtitle: [city, start].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
