import {
  AsteriskIcon,
  BookIcon,
  CaseIcon,
  CogIcon,
  CommentIcon,
  ComposeIcon,
  DocumentIcon,
  DocumentsIcon,
  InlineIcon,
  ProjectsIcon,
  RocketIcon,
  StarIcon,
  TagIcon,
  UserIcon,
} from "@sanity/icons";
import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Portfolio Content")
    .items([
      // Profile (Singleton)
      S.listItem()
        .title("Profile")
        .icon(UserIcon)
        .child(
          S.document().schemaType("profile").documentId("singleton-profile"),
        ),

      S.divider(),

      // Portfolio Section
      S.listItem()
        .title("Portfolio")
        .icon(RocketIcon)
        .child(
          S.list()
            .title("Portfolio Content")
            .items([
              S.listItem()
                .title("Projects")
                .icon(ProjectsIcon)
                .schemaType("project")
                .child(S.documentTypeList("project").title("Projects")),

              S.listItem()
                .title("Skills")
                .icon(AsteriskIcon)
                .schemaType("skill")
                .child(S.documentTypeList("skill").title("Skills")),

              S.listItem()
                .title("Services")
                .icon(TagIcon)
                .schemaType("service")
                .child(S.documentTypeList("service").title("Services")),
            ]),
        ),

      S.divider(),

      // Professional Background
      S.listItem()
        .title("Professional Background")
        .icon(CaseIcon)
        .child(
          S.list()
            .title("Professional Background")
            .items([
              S.listItem()
                .title("Work Experience")
                .icon(CaseIcon)
                .schemaType("experience")
                .child(
                  S.documentTypeList("experience").title("Work Experience"),
                ),

              S.listItem()
                .title("Education")
                .icon(BookIcon)
                .schemaType("education")
                .child(S.documentTypeList("education").title("Education")),

              S.listItem()
                .title("Certifications")
                .icon(DocumentIcon)
                .schemaType("certification")
                .child(
                  S.documentTypeList("certification").title("Certifications"),
                ),

              S.listItem()
                .title("Achievements & Awards")
                .icon(StarIcon)
                .schemaType("achievement")
                .child(
                  S.documentTypeList("achievement").title(
                    "Achievements & Awards",
                  ),
                ),
            ]),
        ),

      S.divider(),

      // Content & Community
      S.listItem()
        .title("Content & Community")
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title("Content & Community")
            .items([
              S.listItem()
                .title("Blog Posts")
                .icon(ComposeIcon)
                .schemaType("blog")
                .child(S.documentTypeList("blog").title("Blog Posts")),

              S.listItem()
                .title("Testimonials")
                .icon(CommentIcon)
                .schemaType("testimonial")
                .child(S.documentTypeList("testimonial").title("Testimonials")),
            ]),
        ),

      S.divider(),

      // Contact Form Submissions
      S.listItem()
        .title("Contact Form Submissions")
        .icon(InlineIcon)
        .child(
          S.list()
            .title("Contact Form Submissions")
            .items([
              S.listItem()
                .title("New Submissions")
                .icon(InlineIcon)
                .child(
                  S.documentTypeList("contact")
                    .title("New Submissions")
                    .filter('_type == "contact" && status == "new"'),
                ),

              S.listItem()
                .title("Archived")
                .icon(InlineIcon)
                .child(
                  S.documentTypeList("contact")
                    .title("Archived Submissions")
                    .filter('_type == "contact" && status == "archived"'),
                ),
            ]),
        ),

      S.divider(),

      // Navigation
      S.listItem()
        .title("Navigation Links")
        .icon(DocumentsIcon)
        .schemaType("navigation")
        .child(S.documentTypeList("navigation").title("Navigation Links")),

      S.divider(),

      // Site Settings (Singleton)
      S.listItem()
        .title("Site Settings")
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("singleton-siteSettings"),
        ),
    ]);
