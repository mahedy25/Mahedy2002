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
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      validation: (Rule) => Rule.max(150),
    }),

    // ---------------- COVER IMAGE ----------------
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt Text", type: "string" }],
    }),

    // ---------------- DEMO VIDEO ----------------
    defineField({
      name: "demoVideo",
      title: "Demo Video (Optional, MP4)",
      type: "file",
      options: {
        accept: "video/mp4",
      },
    }),

    defineField({
      name: "technologies",
      title: "Technologies Used",
      type: "array",
      of: [{ type: "reference", to: [{ type: "skill" }] }],
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
          { title: "Animated Websites", value: "animations" },
          { title: "Other", value: "other" },
        ],
      },
    }),

    defineField({ name: "liveUrl", title: "Live URL", type: "url" }),
    defineField({ name: "githubUrl", title: "GitHub URL", type: "url" }),

    defineField({
      name: "featured",
      title: "Featured Project",
      type: "boolean",
      initialValue: false,
    }),

    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 0,
    }),

    // -------- CASE STUDY CONTENT --------
    defineField({ name: "overview", title: "Project Overview", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "problem", title: "Client Problem", type: "text" }),
    defineField({ name: "solution", title: "Your Solution", type: "text" }),
    defineField({ name: "features", title: "Key Features", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "results", title: "Results & Impact", type: "text" }),
    defineField({ name: "gallery", title: "Gallery Screenshots", type: "array", of: [{ type: "image", options: { hotspot: true } }] })
  ],

  preview: {
    select: {
      title: "title",
      media: "coverImage",
      category: "category",
      featured: "featured",
    },
    prepare({ title, media, category, featured }) {
      return {
        title: featured ? `⭐ ${title}` : title,
        subtitle: category || "Uncategorized",
        media,
      };
    },
  },

  orderings: [
    { title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
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
