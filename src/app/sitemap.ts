import type { MetadataRoute } from "next";
import { nav, site } from "@/data/site";
import { getCaseStudies, getNotes, getTopics } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...nav.map((n) => ({ url: `${site.url}${n.href === "/" ? "" : n.href}` })),
    ...getCaseStudies().map((c) => ({ url: `${site.url}/work/${c.slug}` })),
    ...getNotes().map((n) => ({ url: `${site.url}/notes/${n.slug}`, lastModified: n.updated || n.date || undefined })),
    ...getTopics().map((t) => ({ url: `${site.url}/notes/topics/${t.slug}` })),
  ];
}
