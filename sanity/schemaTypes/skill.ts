import { defineField, defineType } from "sanity";

export default defineType({
  name: "skill",
  title: "Skills",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Skill Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Core Web", value: "core-web" },
          { title: "Frontend", value: "frontend" },
          { title: "Animations", value: "animations" },
          { title: "Backend", value: "backend" },
          { title: "Database", value: "database" },
          { title: "CMS & Auth", value: "cms-auth" },
          { title: "Payments", value: "payments" },
          { title: "DevOps & Hosting", value: "devops-hosting" },
          { title: "Version Control", value: "version-control" },
          { title: "Tools", value: "tools" },
          { title: "Design & UI/UX", value: "design-uiux" },
          { title: "Web Services", value: "web-services" },
          { title: "Soft Skills", value: "soft-skills" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "proficiency",
      title: "Proficiency Level",
      type: "string",
      options: {
        list: [
          { title: "Beginner", value: "beginner" },
          { title: "Intermediate", value: "intermediate" },
          { title: "Advanced", value: "advanced" },
          { title: "Expert", value: "expert" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "yearsOfExperience",
      title: "Years of Experience",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),

    defineField({
      name: "color",
      title: "Brand Color",
      type: "string",
    }),

    defineField({
      name: "icon",
      title: "Skill Icon",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "category",
      media: "icon",
    },
  },
});
