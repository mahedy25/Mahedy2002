import { defineField, defineType } from "sanity";

export default defineType({
  name: "contact",
  title: "Contact Form Submissions",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "subject",
      title: "Subject",
      type: "string",
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Archived", value: "archived" },
        ],
      },
      initialValue: "new",
    }),
    defineField({
      name: "notes",
      title: "Internal Notes",
      type: "text",
      rows: 3,
      description: "Private notes about this inquiry",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "email",
      status: "status",
    },
    prepare(selection) {
      const { title, subtitle, status } = selection;
      const statusEmoji = {
        new: "🆕",
        archived: "📁",
      };
      return {
        title: `${
          statusEmoji[status as keyof typeof statusEmoji] || ""
        } ${title}`,
        subtitle: subtitle,
      };
    },
  },
  orderings: [
    {
      title: "Newest First",
      name: "submittedDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
    {
      title: "Status",
      name: "status",
      by: [{ field: "status", direction: "asc" }],
    },
  ],
});
