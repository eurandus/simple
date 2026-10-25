import { links, site } from "@/data/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-rule pt-6 pb-12 text-[0.95rem]">
      <ul className="flex flex-wrap gap-x-2 gap-y-1">
        {links.map((l, i) => (
          <li key={l.label} className="flex gap-x-2">
            <a href={l.href} className="quiet text-text">{l.label}</a>
            {i < links.length - 1 ? <span aria-hidden className="text-muted">·</span> : null}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-muted">© {new Date().getFullYear()} {site.name}</p>
    </footer>
  );
}
