import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const root = path.join(process.cwd(), "src", "content");

export type Note = {
  slug: string;
  title: string;
  /** ISO date (YYYY-MM-DD). Empty for evergreen notes. */
  date: string;
  /** Evergreen notes are ideas that keep being revised — no date, listed separately. */
  evergreen: boolean;
  /** Optional sort order for evergreen notes */
  order: number;
  /** ISO date of the last meaningful edit (optional) */
  updated: string;
  topics: string[];
  summary: string;
  body: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  summary: string;
  company?: string;
  role?: string;
  industry?: string;
  original?: string;
  body: string;
};

function read(dir: "notes" | "work") {
  const full = path.join(root, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const { data, content } = matter(fs.readFileSync(path.join(full, file), "utf8"));
      return { slug: file.replace(/\.md$/, ""), data, content };
    });
}

function isoDate(value: unknown) {
  if (!value) return "";
  const d = value instanceof Date ? value : new Date(String(value));
  return Number.isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 10);
}

/**
 * All published notes. Dated notes come first (newest first), then evergreen notes by `order`.
 * Set `draft: true` in front matter to hide one.
 */
export function getNotes(): Note[] {
  return read("notes")
    .filter(({ data }) => !data.draft)
    .map(({ slug, data, content }) => ({
      slug,
      title: String(data.title ?? slug),
      date: isoDate(data.date),
      evergreen: Boolean(data.evergreen),
      order: Number(data.order ?? 999),
      updated: isoDate(data.updated),
      topics: Array.isArray(data.topics) ? data.topics.map((t: unknown) => String(t).toLowerCase()) : [],
      summary: String(data.summary ?? ""),
      body: content,
    }))
    .sort((a, b) => {
      if (a.evergreen !== b.evergreen) return a.evergreen ? 1 : -1;
      if (a.evergreen) return a.order - b.order || a.title.localeCompare(b.title);
      return b.date.localeCompare(a.date);
    });
}

/** Dated notes only — the chronological writing list. */
export function getDatedNotes() {
  return getNotes().filter((n) => !n.evergreen);
}

/** Evergreen notes only, in their chosen order. */
export function getEvergreenNotes() {
  return getNotes().filter((n) => n.evergreen);
}

/* ---------------------------------------------------------------- backlinks */

/** Every internal page a piece of Markdown links to, as paths like "/notes/slug". */
function outgoingLinks(md: string) {
  const notes = new Set(read("notes").map((n) => n.slug));
  const targets = new Set<string>();
  for (const m of md.matchAll(/\[\[([a-z0-9-]+)(?:\|[^\]]+)?\]\]/gi)) {
    const slug = m[1].toLowerCase();
    targets.add(notes.has(slug) ? `/notes/${slug}` : `/work/${slug}`);
  }
  for (const m of md.matchAll(/\]\((\/(?:notes|work)\/[a-z0-9-]+)\)/gi)) targets.add(m[1].toLowerCase());
  return targets;
}

export type Backlink = { href: string; title: string };

/** Notes and case studies that link to `href` — shown as "Linked from" at the bottom of a page. */
export function getBacklinks(href: string): Backlink[] {
  const sources: (Backlink & { body: string })[] = [
    ...getNotes().map((n) => ({ href: `/notes/${n.slug}`, title: n.title, body: n.body })),
    ...getCaseStudies().map((c) => ({ href: `/work/${c.slug}`, title: c.title, body: c.body })),
  ];
  return sources
    .filter((s) => s.href !== href && outgoingLinks(s.body).has(href))
    .map(({ href, title }) => ({ href, title }));
}

export function getNote(slug: string) {
  return getNotes().find((n) => n.slug === slug) ?? null;
}

export function getCaseStudies(): CaseStudy[] {
  return read("work").map(({ slug, data, content }) => ({
    slug,
    title: String(data.title ?? slug),
    summary: String(data.summary ?? ""),
    company: data.company,
    role: data.role,
    industry: data.industry,
    original: data.original,
    body: content,
  }));
}

export function getCaseStudy(slug: string) {
  return getCaseStudies().find((c) => c.slug === slug) ?? null;
}

/* ---------------------------------------------------------------- topics */

export function topicSlug(topic: string) {
  return topic.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function getTopics() {
  const map = new Map<string, { name: string; slug: string; count: number }>();
  for (const n of getNotes()) {
    for (const t of n.topics) {
      const slug = topicSlug(t);
      const entry = map.get(slug) ?? { name: t, slug, count: 0 };
      entry.count += 1;
      map.set(slug, entry);
    }
  }
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
}

/* ---------------------------------------------------------------- markdown */

/** [[slug]] or [[slug|label]] → link to a note or case study. Unknown targets become plain text. */
function wikilinks(md: string) {
  const notes = getNotes();
  const work = getCaseStudies();
  return md.replace(/\[\[([a-z0-9-]+)(?:\|([^\]]+))?\]\]/gi, (_, slug: string, label?: string) => {
    const n = notes.find((x) => x.slug === slug);
    if (n) return `[${label ?? n.title}](/notes/${slug})`;
    const w = work.find((x) => x.slug === slug);
    if (w) return `[${label ?? w.title}](/work/${slug})`;
    return label ?? slug;
  });
}

/** Content is written by the site owner, so inline HTML in Markdown is allowed. */
export function render(md: string) {
  return marked.parse(wikilinks(md), { async: false, gfm: true }) as string;
}

export function readingTime(md: string) {
  return Math.max(1, Math.round(md.split(/\s+/).filter(Boolean).length / 220));
}

/* ---------------------------------------------------------------- dates */

/** "2025 · 07" — the list format. */
export function shortDate(iso: string) {
  return iso ? `${iso.slice(0, 4)} · ${iso.slice(5, 7)}` : "";
}

/** "10 July 2025" — the article format. */
export function longDate(iso: string) {
  if (!iso) return "";
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    timeZone: "UTC",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
