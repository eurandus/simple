import type { Metadata } from "next";
import Link from "next/link";
import { certifications, education, experience, selectedWork } from "@/data/experience";
import { resumeUrl } from "@/data/site";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Work",
  description: "Germaine Chin's professional experience — product management at Phillip Nova, application support at Plexus Corp, and earlier roles.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <div className="border-t border-rule pt-12 sm:pt-16">
      <h1 className="text-[1.75rem] font-semibold">Work</h1>
      <p className="mt-2 max-w-[36rem] text-muted">
        Where I&apos;ve worked and what I did there, most recent first. The full version is in my{" "}
        <a href={resumeUrl}>résumé</a>.
      </p>

      <Section title="Selected work" rule={false}>
        <ul className="grid gap-4">
          {selectedWork.map((w) => (
            <li key={w.href}>
              <Link href={w.href}>{w.title}</Link>
              <p className="text-muted">{w.description}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Experience">
        <ol className="grid gap-10">
          {experience.map((r) => (
            <li key={`${r.company}-${r.dates}`}>
              <h3 className="font-semibold">
                {r.url ? <a href={r.url} className="quiet text-text">{r.company}</a> : r.company}
              </h3>
              <p className="flex flex-wrap gap-x-3 text-muted">
                <span>{r.role}</span>
                <span className="meta self-center">{r.dates}</span>
              </p>
              <p className="mt-2 max-w-[38rem]">{r.summary}</p>
              {r.points.length ? (
                <ul className="mt-2 grid max-w-[38rem] list-disc gap-1 pl-5 marker:text-sage">
                  {r.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Education">
        <p>
          {education.degree},{" "}
          <a href={education.url}>{education.school}</a>{" "}
          <span className="meta">{education.dates}</span>
        </p>
        <p className="mt-1 max-w-[38rem] text-muted">{education.detail}</p>
      </Section>

      <Section title="Certifications">
        <ul className="grid gap-1">
          {certifications.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
