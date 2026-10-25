# germainechin.com

A quiet, text-first personal site for Germaine Chin. *Less interface. More thinking.*

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Markdown. The whole site is static: no database, no auth, no client-side JavaScript beyond the active-nav highlight.

## Pages

| Route | What it is |
|---|---|
| `/` | Intro, Currently, Work, Writing, About |
| `/work` | Selected work + experience, education, certifications |
| `/work/[slug]` | Case studies (`src/content/work/*.md`) |
| `/notes` | *Thinking about Thinking*: topic links, dated index, evergreen notes |
| `/notes/[slug]` | A note (dated or evergreen), with backlinks |
| `/notes/topics/[topic]` | Notes for one topic (generated from front matter) |
| `/about` | Personal essay, education, certifications, résumé link |

## Run locally

Node 20.9+ (22 LTS recommended).

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build + type-check
npm run lint
```

## Editing

| To change… | Edit |
|---|---|
| Name, headline, tagline, "Currently", nav | `src/data/site.ts` |
| Email, LinkedIn, X, résumé link | `src/data/site.ts` (`email`, `resumeUrl`, `links`) |
| Jobs, education, certifications, selected work | `src/data/experience.ts` |
| About essay | `src/app/about/page.tsx` (plain paragraphs) |
| Notes | `src/content/notes/*.md` |
| Case studies | `src/content/work/*.md` + an entry in `selectedWork` |

### Writing a note

Add a file such as `src/content/notes/my-note.md`. The file name becomes the URL.

```md
---
title: "My note"
date: "2026-11-02"
topics: ["product management", "ai"]
summary: "One sentence, used for search engines and link previews."
draft: false
---

Write in Markdown. You can link to another note with [[llms-and-cognitive-science]],
or with your own label: [[mcp-and-manus-ai|my MCP weekend]].
```

That's all. The note appears on `/notes`, on the homepage (latest five), in the sitemap and under its topic pages. Notes are listed by `date`, newest first. Add `draft: true` to hide a note.

### Evergreen notes and linking

Some notes are ideas you keep revising rather than posts with a date, such as *Things I believe* and its seven principles. Mark these as evergreen:

```md
---
title: "Revisit old ideas"
evergreen: true      # no date; listed under "Evergreen notes" on /notes
order: 2             # position in the Previous / Next sequence
updated: "2026-10-23"
topics: ["principles"]
summary: "Ideas don't expire."
---
```

- **Links between notes.** `[[slug]]` links to a note or case study and uses its title as the link text. `[[slug|label]]` lets you choose your own text. A link to a page that doesn't exist shows as plain text, so the site never has a broken link.
- **Backlinks.** Every note and case study automatically gets a *Linked from* list at the bottom, showing each page that links to it with `[[…]]` or a plain `/notes/…` link.
- **Reading order.** Evergreen notes step through their `order` with Previous and Next links. Dated notes step through time with Newer and Older links.
- **Map of content.** `things-i-believe.md` is an index note that links to each principle, in the same way you'd keep one in Obsidian. To add a principle, create the note and add a `[[slug]]` line to that list.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel, choose **Add New → Project** and import the repo. The Next.js preset is detected automatically and no environment variables are needed. Click **Deploy**.
3. Check the `*.vercel.app` preview.
4. Go to **Settings → Domains**, add `germainechin.com` and `www.germainechin.com` (set www to redirect to the apex), then set the DNS records Vercel shows you at your registrar.
5. Once Vercel shows **Valid Configuration**, disconnect the domain from Carrd.

From then on, every push to `main` deploys to production.

The canonical URL used in the sitemap and in Open Graph tags is `site.url` in `src/data/site.ts`.

## Design notes

- **One column.** Max width is 48rem, giving roughly 700px of text. Body text is Inter (self-hosted) at 17px with 1.7 line height. Dates and metadata use the system monospace font.
- **Mostly neutral.** About 90% of the page is neutral colours. Ocean Blue is darkened to `#2E6A8E` for link text: the original `#4281A4` is 4.0:1 on the background, which fails AA, so the original is kept for underlines and the focus ring. Coral appears only in the active-nav underline, text selection and blockquote rules. Sage colours list markers.
- **Contrast.** Body text is 12.4:1, muted text 4.6:1 and links 5.6:1. Every page passes axe (WCAG 2.2 AA plus best-practice rules).
- **No animation.** The only motion is a colour transition on links, and it is turned off under `prefers-reduced-motion`.
- **No decoration.** There are no icons, images, cards or illustrations. The favicon is a plain coral dot.
