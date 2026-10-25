# Content audit, minimal version (23 Oct 2026)

Sources: germainechin.com (Carrd one-pager with hidden sections) and the linked Notion pages. I read all of them in full, directly from the live pages.

## Kept

| Content | Where it lives now |
|---|---|
| Name, "Product Manager", Cognitive Science background | Home, `site.ts` |
| Tagline "I like to transform chaos into structured and *controlled* chaos." | Home, About |
| Bio: Phillip Nova, SG/MY trading platforms, account opening, client portal, SSO, regulation | Home "Currently", About |
| Journey: UNIMAS, cognitive load / mental models / attention, design that fits how people think | About |
| Experience: Phillip Nova, Plexus Corp, META Research, Splitsplat, Singapore Aerospace Manufacturing | `/work`, `experience.ts` |
| Plexus metrics you published (ERP +30%, 100+ P1/P2 within SLA) | `/work` |
| Education: UNIMAS BSc Cognitive Sciences 2016–2019, CGPA 3.69 | `/work`, `/about` |
| Certifications: CSPO®, CSM®, Chat Ambassador (IMH Singapore) | `/work`, `/about` |
| Case study: Trading On-boarding Platform (Notion) | `/work/trading-onboarding`, which also links to the Notion original |
| Post: MCP / Manus AI weekend (12 Jul 2025) | `/notes/mcp-and-manus-ai` |
| Post: arXiv:2409.02387 reading (10 Jul 2025) | `/notes/llms-and-cognitive-science` (paper title and authors checked on arXiv) |
| Links: LinkedIn, X, email, résumé (Google Doc) | Footer, About |

## Removed for this version

- Playground and fun projects: Kanban game, Portfolio Revamp, Germaine's Tech, TIL, useful links.
- Hobby list and personality-test links. Tabletop games are kept as one sentence in About; delete it if you prefer.
- Wishlist, WhatsApp number, visa status, the contact form, and the 3Commas and VeryWowWalk items.
- "Coming soon" placeholders: Current Trading Platform, Chat Ambassador journey.
- "Sense, Solve, Ship / The Aspiring AI PM's Mindset" framework (you asked to drop complex product frameworks).
- Instagram, which mainly linked the photography/hobby section.

## Please review

1. **Email.** Your site says `germainecwc@gmail.com`; the Notion case study says `germainechinwc@gmail.com`. The site uses the first one. Change it in `src/data/site.ts`.
2. **Résumé sharing.** The Google Doc couldn't be opened anonymously. Make sure it is set to *Anyone with the link → Viewer*.
3. **Copy from the brief, not from your site.** The line "I'm interested in how people think, how systems work…", the homepage "Currently" paragraph, and the "A little more about who I am…" teaser all come from the brief. Edit them in `site.ts` and `page.tsx`.
4. **About essay.** It is rewritten from your published About, Journey and Experience text, and it doesn't add any new facts. Read it to check it sounds like you.
5. **Case study.** It is condensed from Notion, and every outcome and the quote come from that page. I added no "what I learned" section; there's a comment in the Markdown file where you can write one.
6. **Note titles** were lightly rewritten for readability. The originals were "Whereabout Germaine's weekend? Mid July Edition" and "Current Science Paper Reads: arXiv:2409.02387".

## Links verified

LinkedIn, X post, Phillip Nova, UNIMAS FCSHD, accountopening.phillipnova.com.sg, the Notion case study and arXiv 2409.02387 all load. Every internal link returns 200.
