import type { Metadata } from "next";
import Link from "next/link";
import { certifications, education } from "@/data/experience";
import { resumeUrl } from "@/data/site";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Germaine Chin — a Product Manager with a background in Cognitive Science, on how I got into product and how I approach problems.",
  alternates: { canonical: "/about" },
};

/*
  The essay below is rewritten from the About, Journey and Experience sections
  of the previous germainechin.com. Edit the paragraphs directly.
*/
export default function AboutPage() {
  return (
    <div className="border-t border-rule pt-12 sm:pt-16">
      <h1 className="text-[1.75rem] font-semibold">About</h1>

      <div className="prose mt-8 max-w-[40rem]">
        <p>
          Hi, I&apos;m Germaine. I&apos;m a Product Manager at{" "}
          <a href="https://www.phillipnova.com.sg/">Phillip Nova</a>, where I look after trading platform
          ecosystems for the Singapore and Malaysia markets. Most of my work sits where people, technology and
          regulation meet — automated account opening, client portal improvements, single sign-on, and keeping
          all of it compliant.
        </p>

        <h2>Where I started</h2>
        <p>
          I studied Cognitive Sciences at UNIMAS, and that&apos;s where I became fascinated by how people
          process information, make decisions and learn new things. Ideas like cognitive load, mental models
          and attention still shape how I work. I&apos;d rather design interfaces and workflows that fit the
          way people naturally think than ask people to adapt to the limits of the technology.
        </p>

        <h2>How I got into product</h2>
        <p>
          I didn&apos;t go straight there. I taught art for a year, which showed me how differently people
          learn. Then I moved into systems: data pipeline work at META Research, followed by three years in
          application support at Plexus Corp, where I looked after ERP and supply-chain planning systems for
          manufacturing plants across APAC — analysing performance, resolving incidents and automating
          compliance reports.
        </p>
        <p>
          In 2024 I moved from backend application engineering into product management at Phillip Nova. My
          first project was rebuilding our{" "}
          <Link href="/work/trading-onboarding">trading account onboarding</Link>, which is still a good
          example of how I like to work.
        </p>

        <h2>How I approach problems</h2>
        <p>
          My one-liner is that I like to transform chaos into structured and controlled chaos. In practice
          that means starting with the people involved — talking to every group affected, mapping how things
          work today — before deciding what to build. In regulated products I treat compliance as part of the
          design rather than a hurdle at the end.
        </p>
        <p>
          I think of agile as a mindset rather than a tool or a methodology; it should shift like water. Every
          product is different, so if an approach doesn&apos;t work, I try something else. I keep a short,
          evolving list of <Link href="/notes/things-i-believe">things I believe</Link>.
        </p>
        <p>
          People who know me well describe me as upbeat, people-centred and driven by possibilities.
        </p>

        <h2>What I&apos;m interested in</h2>
        <p>
          Product thinking, human cognition and AI — especially where large language models and cognitive
          science overlap, and how governance, ethics and compliance will shape AI products. I try to learn in
          public and write some of it down in my <Link href="/notes">notes</Link>.
        </p>
        <p>
          Outside work, you&apos;ll usually find me in a tabletop role-playing game, which turns out to be good
          practice for collaborative storytelling, scenario planning and creative problem-solving.
        </p>
      </div>

      <Section title="Education">
        <p>
          {education.degree}, <a href={education.url}>{education.school}</a>{" "}
          <span className="meta">{education.dates}</span>
        </p>
      </Section>

      <Section title="Certifications">
        <ul className="grid gap-1">
          {certifications.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </Section>

      <Section title="Résumé" id="resume">
        <p>
          My <a href={resumeUrl}>latest résumé</a> is on Google Docs. For the short version, see{" "}
          <Link href="/work">Work</Link>.
        </p>
      </Section>

    </div>
  );
}
