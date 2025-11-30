import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Projects",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Project Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "Short one-liner about the project",
      validation: (Rule) => Rule.max(150),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
          description: "Describe the image for accessibility",
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "technologies",
      title: "Technologies Used",
      type: "array",
      of: [{ type: "reference", to: [{ type: "skill" }] }],
      description: "Select from your skills list (max 6 recommended)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Project Category",
      type: "string",
      options: {
        list: [
          { title: "Frontend Web Development", value: "frontend" },
          { title: "Backend Web Development", value: "backend" },
          { title: "Full Stack Web Development", value: "full-stack" },
          { title: "Animated websites", value: "animations" },
          { title: "Other", value: "other" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "liveUrl",
      title: "Live URL",
      type: "url",
      description: "Link to the live project",
    }),
    defineField({
      name: "githubUrl",
      title: "GitHub URL",
      type: "url",
      description: "Link to the GitHub repository",
    }),
    defineField({
      name: "featured",
      title: "Featured Project",
      type: "boolean",
      description: "Show this project prominently on the homepage",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first (0-99)",
      initialValue: 0,
      validation: (Rule) => Rule.min(0).max(99),
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "coverImage",
      category: "category",
      featured: "featured",
    },
    prepare(selection) {
      const { title, media, category, featured } = selection;
      return {
        title: featured ? `⭐ ${title}` : title,
        subtitle: category || "Uncategorized",
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
      title: "Featured First",
      name: "featuredFirst",
      by: [
        { field: "featured", direction: "desc" },
        { field: "order", direction: "asc" },
      ],
    },
  ],
});
