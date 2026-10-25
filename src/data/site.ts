/**
 * Profile, navigation and links — edit here, not in the page components.
 * Every link below was checked against germainechin.com (see docs/CONTENT_AUDIT.md).
 */

export const site = {
  url: "https://germainechin.com",
  name: "Germaine Chin",
  role: "Product Manager",
  description:
    "Germaine Chin is a Product Manager at Phillip Nova with a background in Cognitive Science. Notes on products, technology and how people think.",
  /** Line under the name on the homepage. */
  headline: "Product Manager with a background in Cognitive Science.",
  /** Short statement of interest (editorial, from the site brief — edit freely). */
  interest:
    "I'm interested in how people think, how systems work, and how technology can bring the two together.",
  /** My original one-liner. */
  tagline: "I like to transform chaos into structured and controlled chaos.",
  /** "Currently" on the homepage. ⚠️ Review and update whenever things change. */
  currently: [
    "I'm a Product Manager at Phillip Nova, where I look after trading platform ecosystems for the Singapore and Malaysia markets — work like automated account opening, client portal enhancements and single sign-on.",
    "Outside the day job I'm reading about where large language models meet cognitive science, and experimenting with tools like MCP.",
  ],
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/notes", label: "Notes" },
  { href: "/about", label: "About" },
] as const;

export const email = "germainecwc@gmail.com"; // ⚠️ Notion case study lists germainechinwc@gmail.com — confirm.

export const resumeUrl =
  "https://docs.google.com/document/d/1IoSzvse36YKSOitxOmMmfRTLoGCgjgKjfBkoeirIF4U/edit?usp=sharing";

/** Footer + About links, in display order. */
export const links = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/germainecwc/" },
  { label: "Email", href: `mailto:${email}` },
  { label: "Résumé", href: resumeUrl },
  { label: "X", href: "https://x.com/softserveotter" },
];
