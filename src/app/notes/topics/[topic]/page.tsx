import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNotes, getTopics, topicSlug } from "@/lib/content";
import { NoteList } from "@/components/NoteList";

type Props = { params: Promise<{ topic: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getTopics().map((t) => ({ topic: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topic } = await params;
  const t = getTopics().find((x) => x.slug === topic);
  if (!t) return {};
  return { title: `Notes on ${t.name}`, alternates: { canonical: `/notes/topics/${t.slug}` } };
}

export default async function TopicPage({ params }: Props) {
  const { topic } = await params;
  const t = getTopics().find((x) => x.slug === topic);
  if (!t) notFound();
  const notes = getNotes().filter((n) => n.topics.some((x) => topicSlug(x) === topic));

  return (
    <div className="border-t border-rule pt-12 sm:pt-16">
      <p className="meta">
        <Link href="/notes" className="quiet">Notes</Link> / Topic
      </p>
      <h1 className="mt-3 text-[1.75rem] font-semibold">{t.name}</h1>
      <p className="mt-2 text-muted">
        {notes.length} {notes.length === 1 ? "note" : "notes"}
      </p>
      <div className="mt-10">
        <NoteList notes={notes} />
      </div>
    </div>
  );
}
