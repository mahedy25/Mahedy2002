import { defineQuery } from "next-sanity";

import { FloatingDockClient } from "./FloatingDockClient";
import { sanityFetch } from "../sanity/lib/live";



const NAVIGATION_QUERY =
  defineQuery(`*[_type == "navigation"] | order(order asc){
  title,
  href,
  icon,
  isExternal
}`);

export async function FloatingDock() {
  const { data: navItems } = await sanityFetch({ query: NAVIGATION_QUERY });

  if (!navItems || navItems.length === 0) {
    return null;
  }

  return <FloatingDockClient navItems={navItems} />;
}