"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, site } from "@/data/site";

export function Header() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pt-8 pb-6 sm:pt-12">
      <Link href="/" className="quiet font-semibold text-text">
        {site.name}
      </Link>
      <nav aria-label="Main">
        <ul className="flex gap-x-5 text-[0.97rem]">
          {nav.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={
                    active
                      ? "text-text underline decoration-coral decoration-2 underline-offset-[0.4em]"
                      : "quiet text-muted hover:text-text"
                  }
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
