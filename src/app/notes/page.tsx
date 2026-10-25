import type { Metadata } from "next";
import Link from "next/link";
import { getDatedNotes, getEvergreenNotes, getTopics } from "@/lib/content";
import { NoteList } from "@/components/NoteList";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Notes",
  description: "Thinking about Thinking — notes on products, technology, cognitive science, and everything in between.",
  alternates: { canonical: "/notes" },
};

export default function NotesPage() {
  const topics = getTopics();
  const evergreen = getEvergreenNotes();
  return (
    <div className="border-t border-rule pt-12 sm:pt-16">
      <h1 className="text-[1.75rem] font-semibold">Thinking about Thinking</h1>
      <p className="mt-2 max-w-[36rem] text-muted">
        Notes on products, technology, cognitive science, and everything in between.
      </p>

      {topics.length ? (
        <p className="mt-8 text-[0.97rem]">
          <span className="text-muted">Topics: </span>
          {topics.map((t, i) => (
            <span key={t.slug}>
              <Link href={`/notes/topics/${t.slug}`}>{t.name}</Link>
              {i < topics.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>
      ) : null}

      <div className="mt-10">
        <NoteList notes={getDatedNotes()} />
      </div>

      {evergreen.length ? (
        <Section title="Evergreen notes">
          <p className="mb-4 max-w-[36rem] text-muted">
            Ideas I keep coming back to and revising. They link to each other, so start anywhere.
          </p>
          <NoteList notes={evergreen} plain />
        </Section>
      ) : null}
    </div>
  );
}
