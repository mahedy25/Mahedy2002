import type { SchemaTypeDefinition } from "sanity";
import achievement from "./achievement";
import blog from "./blog";
import certification from "./certification";
import contact from "./contact";
import education from "./education";
import experience from "./experience";
import navigation from "./navigation";
import profile from "./profile";
import project from "./project";
import service from "./service";
import siteSettings from "./siteSettings";
import skill from "./skill";
import testimonial from "./testimonial";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    profile,
    project,
    skill,
    experience,
    education,
    testimonial,
    certification,
    achievement,
    blog,
    service,
    contact,
    siteSettings,
    navigation,
  ],
};
