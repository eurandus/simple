import Link from "next/link";
import type { Note } from "@/lib/content";
import { shortDate } from "@/lib/content";

/**
 * Kepano-style index: "2025 · 07   Title".
 * `plain` drops the date column (used for evergreen notes).
 */
export function NoteList({ notes, plain = false }: { notes: Note[]; plain?: boolean }) {
  if (!notes.length) return <p className="text-muted">Nothing here yet.</p>;
  if (plain) {
    return (
      <ul className="grid gap-2.5">
        {notes.map((n) => (
          <li key={n.slug}>
            <Link href={`/notes/${n.slug}`} className="quiet text-text">
              {n.title}
            </Link>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ul className="grid gap-2.5">
      {notes.map((n) => (
        <li key={n.slug} className="grid grid-cols-[5.5rem_1fr] items-baseline gap-x-4 sm:grid-cols-[6.5rem_1fr]">
          {n.date ? (
            <time dateTime={n.date} className="meta">
              {shortDate(n.date)}
            </time>
          ) : (
            <span className="meta">evergreen</span>
          )}
          <Link href={`/notes/${n.slug}`} className="quiet text-text">
            {n.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
