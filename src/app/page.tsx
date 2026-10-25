import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";
import { experience } from "@/data/experience";
import { getDatedNotes, getNote } from "@/lib/content";
import { NoteList } from "@/components/NoteList";
import { Section } from "@/components/Section";

export const metadata: Metadata = { alternates: { canonical: "/" } };

/** Italicises "controlled" in my one-liner, as on the original site. */
function Tagline({ text }: { text: string }) {
  const [before, after] = text.split(/\bcontrolled\b/);
  return (
    <p className="mt-4 max-w-[36rem]">
      {after === undefined ? (
        text
      ) : (
        <>
          {before}
          <em>controlled</em>
          {after}
        </>
      )}
    </p>
  );
}

export default function Home() {
  const roles = experience.filter((r) => r.featured);
  const notes = getDatedNotes().slice(0, 5);
  const manifesto = getNote("things-i-believe");

  return (
    <>
      <div className="border-t border-rule pt-12 sm:pt-16">
        <h1 className="text-[1.75rem] font-semibold sm:text-[2rem]">{site.name}</h1>
        <p className="mt-2 text-[1.15rem] text-muted">{site.headline}</p>

        <p className="mt-8 max-w-[36rem]">{site.interest}</p>
        <Tagline text={site.tagline} />
      </div>

      <Section title="Currently" rule={false}>
        <div className="grid max-w-[36rem] gap-4">
          {site.currently.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </Section>

      <Section title="Work" rule={false}>
        <ul className="grid gap-2.5">
          {roles.map((r) => (
            <li key={r.company} className="grid grid-cols-[5.5rem_1fr] items-baseline gap-x-4 sm:grid-cols-[6.5rem_1fr]">
              <span className="meta">
                {r.from}–{r.to}
              </span>
              <span>
                {r.company}
                <span className="text-muted"> · {r.role}</span>
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-5">
          <Link href="/work">Selected work and experience →</Link>
        </p>
      </Section>

      <Section title="Writing">
        <NoteList notes={notes} />
        {manifesto ? (
          <p className="mt-5 max-w-[36rem]">
            <Link href="/notes/things-i-believe">{manifesto.title}</Link>
            <span className="text-muted"> — a small manifesto, written as linked notes.</span>
          </p>
        ) : null}
        <p className="mt-5">
          <Link href="/notes">All notes →</Link>
        </p>
      </Section>

      <Section title="About">
        <p className="max-w-[36rem]">A little more about who I am, what I do, and how I think.</p>
        <p className="mt-5">
          <Link href="/about">Read more →</Link>
        </p>
      </Section>
    </>
  );
}
