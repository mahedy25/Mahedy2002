import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteTitle",
      title: "Site Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "siteDescription",
      title: "Site Description",
      type: "text",
      rows: 3,
      description: "Meta description for SEO",
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: "siteKeywords",
      title: "Site Keywords",
      type: "array",
      of: [{ type: "string" }],
      description: "SEO keywords",
    }),
    defineField({
      name: "siteLogo",
      title: "Site Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      type: "image",
      description: "32x32 px recommended",
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      description:
        "Default image for social media sharing (1200x630 recommended)",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "primaryColor",
      title: "Primary Brand Color",
      type: "string",
      description: "Hex color code (e.g., #3B82F6)",
    }),
    defineField({
      name: "secondaryColor",
      title: "Secondary Brand Color",
      type: "string",
      description: "Hex color code",
    }),
    defineField({
      name: "accentColor",
      title: "Accent Color",
      type: "string",
      description: "Hex color code for CTAs and highlights",
    }),
    defineField({
      name: "ctaText",
      title: "Main CTA Text",
      type: "string",
      description:
        "Primary call-to-action button text (e.g., 'Hire Me', 'Get in Touch')",
    }),
    defineField({
      name: "ctaUrl",
      title: "Main CTA URL",
      type: "string",
      description: "Where the CTA button leads (e.g., #contact, /contact)",
    }),
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      type: "string",
      description: "Main headline on homepage",
    }),
    defineField({
      name: "heroSubheadline",
      title: "Hero Subheadline",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "heroBackground",
      title: "Hero Background Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "showBlog",
      title: "Show Blog Section",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "showServices",
      title: "Show Services Section",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "showTestimonials",
      title: "Show Testimonials Section",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "googleAnalyticsId",
      title: "Google Analytics ID",
      type: "string",
      description: "GA tracking ID (e.g., G-XXXXXXXXXX)",
    }),
    defineField({
      name: "facebookPixelId",
      title: "Facebook Pixel ID",
      type: "string",
    }),
    defineField({
      name: "twitterHandle",
      title: "Twitter Handle",
      type: "string",
      description: "For Twitter card metadata (without @)",
    }),
    defineField({
      name: "footer",
      title: "Footer Settings",
      type: "object",
      fields: [
        {
          name: "text",
          title: "Footer Text",
          type: "text",
          rows: 2,
        },
        {
          name: "copyrightText",
          title: "Copyright Text",
          type: "string",
          description: "E.g., '© 2025 Your Name. All rights reserved.'",
        },
        {
          name: "links",
          title: "Footer Links",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "title", type: "string", title: "Title" },
                { name: "url", type: "string", title: "URL" },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: "maintenanceMode",
      title: "Maintenance Mode",
      type: "boolean",
      description: "Enable to show maintenance page",
      initialValue: false,
    }),
    defineField({
      name: "maintenanceMessage",
      title: "Maintenance Message",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: "siteTitle",
      media: "siteLogo",
    },
  },
});
