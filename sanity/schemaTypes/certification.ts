import { defineField, defineType } from "sanity";

export default defineType({
  name: "certification",
  title: "Certifications",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Certification Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "issuer",
      title: "Issuing Organization",
      type: "string",
      description: "E.g., 'AWS', 'Google Cloud', 'Microsoft'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "issueDate",
      title: "Issue Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "expiryDate",
      title: "Expiry Date",
      type: "date",
      description: "Leave blank if certification doesn't expire",
    }),
    defineField({
      name: "credentialId",
      title: "Credential ID",
      type: "string",
      description: "Certificate ID or badge number",
    }),
    defineField({
      name: "credentialUrl",
      title: "Credential URL",
      type: "url",
      description: "Link to verify the certification",
    }),
    defineField({
      name: "logo",
      title: "Badge/Logo",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Upload certification badge or logo",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "What skills or knowledge this certification represents",
    }),
    defineField({
      name: "skills",
      title: "Related Skills",
      type: "array",
      of: [{ type: "reference", to: [{ type: "skill" }] }],
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
      title: "name",
      subtitle: "issuer",
      media: "logo",
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
      by: [{ field: "issueDate", direction: "desc" }],
    },
  ],
});
