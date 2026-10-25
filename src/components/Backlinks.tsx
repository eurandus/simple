import Link from "next/link";
import type { Backlink } from "@/lib/content";

/** Obsidian-style backlinks: every note or case study that links here. */
export function Backlinks({ links }: { links: Backlink[] }) {
  if (!links.length) return null;
  return (
    <section aria-labelledby="backlinks" className="mt-6">
      <h2 id="backlinks" className="text-muted">
        Linked from
      </h2>
      <ul className="mt-1 grid gap-1">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href}>{l.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
