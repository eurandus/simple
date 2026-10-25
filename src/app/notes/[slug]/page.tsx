import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getBacklinks,
  getDatedNotes,
  getEvergreenNotes,
  getNote,
  getNotes,
  longDate,
  readingTime,
  render,
  topicSlug,
} from "@/lib/content";
import { Backlinks } from "@/components/Backlinks";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getNotes().map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const note = getNote((await params).slug);
  if (!note) return {};
  return {
    title: note.title,
    description: note.summary,
    alternates: { canonical: `/notes/${note.slug}` },
    openGraph: {
      type: "article",
      title: note.title,
      description: note.summary,
      ...(note.date ? { publishedTime: note.date } : {}),
      ...(note.updated ? { modifiedTime: note.updated } : {}),
    },
  };
}

export default async function NotePage({ params }: Props) {
  const note = getNote((await params).slug);
  if (!note) notFound();

  // Dated notes step through time; evergreen notes step through their chosen order.
  const sequence = note.evergreen ? getEvergreenNotes() : getDatedNotes();
  const i = sequence.findIndex((n) => n.slug === note.slug);
  const prev = sequence[i - 1];
  const next = sequence[i + 1];
  const labels = note.evergreen ? ["Previous", "Next"] : ["Newer", "Older"];
  const backlinks = getBacklinks(`/notes/${note.slug}`);

  return (
    <article className="border-t border-rule pt-12 sm:pt-16">
      <p className="meta">
        {note.evergreen ? (
          <>
            Evergreen note
            {note.updated ? (
              <>
                {" "}· updated <time dateTime={note.updated}>{longDate(note.updated)}</time>
              </>
            ) : null}
          </>
        ) : (
          <time dateTime={note.date}>{longDate(note.date)}</time>
        )}{" "}
        · {readingTime(note.body)} min read
      </p>
      <h1 className="mt-3 text-[1.75rem] font-semibold sm:text-[2rem]">{note.title}</h1>

      <div className="prose mt-8 max-w-[40rem]" dangerouslySetInnerHTML={{ __html: render(note.body) }} />

      <footer className="mt-12 border-t border-rule pt-6 text-[0.97rem]">
        {note.topics.length ? (
          <p>
            <span className="text-muted">Filed under </span>
            {note.topics.map((t, j) => (
              <span key={t}>
                <Link href={`/notes/topics/${topicSlug(t)}`}>{t}</Link>
                {j < note.topics.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
        ) : null}

        <Backlinks links={backlinks} />

        <nav aria-label="More notes" className="mt-6 grid gap-1">
          {prev ? (
            <p>
              <span className="text-muted">{labels[0]}: </span>
              <Link href={`/notes/${prev.slug}`}>{prev.title}</Link>
            </p>
          ) : null}
          {next ? (
            <p>
              <span className="text-muted">{labels[1]}: </span>
              <Link href={`/notes/${next.slug}`}>{next.title}</Link>
            </p>
          ) : null}
          <p>
            <Link href="/notes">All notes →</Link>
          </p>
        </nav>
      </footer>
    </article>
  );
}
