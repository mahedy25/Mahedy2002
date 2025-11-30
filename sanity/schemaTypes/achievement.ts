import { defineField, defineType } from "sanity";

export default defineType({
  name: "achievement",
  title: "Achievements & Awards",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Achievement Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Award", value: "award" },
          { title: "Hackathon Win", value: "hackathon" },
          { title: "Publication", value: "publication" },
          { title: "Speaking Engagement", value: "speaking" },
          { title: "Open Source Contribution", value: "open-source" },
          { title: "Milestone", value: "milestone" },
          { title: "Recognition", value: "recognition" },
          { title: "Other", value: "other" },
        ],
      },
    }),
    defineField({
      name: "issuer",
      title: "Issuing Organization",
      type: "string",
      description: "Who awarded this?",
    }),
    defineField({
      name: "date",
      title: "Date Achieved",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "image",
      title: "Image/Badge",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Award photo, badge, or certificate",
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      description: "Link to announcement, certificate, or relevant page",
    }),
    defineField({
      name: "featured",
      title: "Featured Achievement",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "issuer",
      media: "image",
      type: "type",
    },
    prepare(selection) {
      const { title, subtitle, media, type } = selection;
      return {
        title: title,
        subtitle: `${type} - ${subtitle}`,
        media: media,
      };
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Newest First",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
});
