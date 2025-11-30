import { defineField, defineType } from "sanity";

export default defineType({
  name: "blog",
  title: "Blog Posts",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
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
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Brief summary for preview cards",
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Tutorial", value: "tutorial" },
          { title: "Technical", value: "technical" },
          { title: "AI/ML", value: "ai-ml" },
          { title: "Web Development", value: "web-dev" },
          { title: "Career", value: "career" },
          { title: "Opinion", value: "opinion" },
          { title: "Project Showcase", value: "showcase" },
          { title: "Best Practices", value: "best-practices" },
          { title: "News", value: "news" },
        ],
      },
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "readTime",
      title: "Read Time (minutes)",
      type: "number",
      description: "Estimated reading time",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "featuredImage",
      category: "category",
    },
    prepare(selection) {
      const { title, media, category } = selection;
      return {
        title: title,
        subtitle: category || "Uncategorized",
        media: media,
      };
    },
  },
  orderings: [
    {
      title: "Published Date, Newest",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Published Date, Oldest",
      name: "publishedAsc",
      by: [{ field: "publishedAt", direction: "asc" }],
    },
  ],
});
