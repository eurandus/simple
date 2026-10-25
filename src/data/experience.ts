/**
 * Career history, education and certifications — migrated from germainechin.com.
 * Metrics appear only where I published them myself.
 */

export type Role = {
  company: string;
  url?: string;
  role: string;
  /** Display years, e.g. "2024" / "Now" */
  from: string;
  to: string;
  /** Full dates for the Work page */
  dates: string;
  summary: string;
  points: string[];
  /** Show on the homepage list */
  featured?: boolean;
};

export const experience: Role[] = [
  {
    company: "Phillip Nova",
    url: "https://www.phillipnova.com.sg/",
    role: "Product Manager",
    from: "2024",
    to: "Now",
    dates: "Jan 2024 – present",
    summary:
      "Trading platform ecosystems for the Singapore and Malaysia markets, including automated account opening, client portal enhancements and single sign-on.",
    points: [
      "Own the product lifecycle from ideation and development through launch and iteration.",
      "Keep roadmaps compliant with MAS, AML/CFT, SGX, Global Data Market, Fair Trading Practice and Securities and Futures Act requirements.",
      "Run Scrum across several developer teams — backlog prioritisation, sprint planning and retrospectives — and adapt it to how each team works.",
    ],
    featured: true,
  },
  {
    company: "Plexus Corp",
    role: "Application Support Engineer / Analyst",
    from: "2020",
    to: "2023",
    dates: "Dec 2020 – Dec 2023",
    summary: "ERP and supply-chain planning systems for global manufacturing operations.",
    points: [
      "Improved ERP system performance by 30% through application analysis and cross-regional collaboration.",
      "Resolved 100+ Priority 1 and 2 incidents within SLA, preventing downtime for manufacturing operations.",
      "Automated shipment department reports for Free Zone Act 1990 and GST compliance across APAC plants.",
      "Supported Kinaxis supply-chain planning and resolved system discrepancies.",
    ],
    featured: true,
  },
  {
    company: "META Research",
    role: "Associate System Analyst",
    from: "2020",
    to: "2020",
    dates: "Jul – Nov 2020",
    summary: "Data analysis and system optimisation, including data pipeline optimisation projects that improved processing efficiency.",
    points: [],
  },
  {
    company: "Splitsplat",
    role: "Art Instructor",
    from: "2019",
    to: "2020",
    dates: "Jun 2019 – Jun 2020",
    summary:
      "Developed and taught creative curriculum for diverse learners, using cognitive learning methods — a first lesson in how differently people learn.",
    points: [],
  },
  {
    company: "Singapore Aerospace Manufacturing",
    role: "IT Application Intern",
    from: "2018",
    to: "2018",
    dates: "Jun – Aug 2018",
    summary: "Internship in IT applications.",
    points: [],
  },
];

export const education = {
  school: "Universiti Malaysia Sarawak (UNIMAS)",
  url: "https://www.unimas.my/fcshd",
  degree: "BSc Cognitive Sciences",
  dates: "2016 – 2019",
  detail:
    "Human cognition, decision-making, information processing and human–computer interaction. Final-year project on cognitive load theory and memory. CGPA 3.69.",
};

export const certifications = [
  "Certified Scrum Product Owner (CSPO®)",
  "Certified ScrumMaster (CSM®)",
  "Chat Ambassador, Institute of Mental Health Singapore",
];

/** Selected work — verified case studies only. `href` can be internal or external. */
export const selectedWork = [
  {
    title: "Rebuilding trading account onboarding",
    href: "/work/trading-onboarding",
    description:
      "My first project as a PM at Phillip Nova: replacing a legacy e-form with a unified, compliance-first onboarding platform.",
  },
];
