import type { ReactNode } from "react";

/** A titled block separated by a thin rule — the only "component" the pages really need. */
export function Section({
  title,
  id,
  children,
  rule = true,
}: {
  title: string;
  id?: string;
  children: ReactNode;
  rule?: boolean;
}) {
  const headingId = id ?? title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return (
    <section aria-labelledby={headingId} className={rule ? "mt-12 border-t border-rule pt-10" : "mt-12"}>
      <h2 id={headingId} className="section-title">
        {title}
      </h2>
      {children}
    </section>
  );
}
