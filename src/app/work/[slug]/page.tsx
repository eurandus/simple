import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBacklinks, getCaseStudies, getCaseStudy, render } from "@/lib/content";
import { Backlinks } from "@/components/Backlinks";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getCaseStudies().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cs = getCaseStudy((await params).slug);
  if (!cs) return {};
  return {
    title: cs.title,
    description: cs.summary,
    alternates: { canonical: `/work/${cs.slug}` },
    openGraph: { type: "article", title: cs.title, description: cs.summary },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const cs = getCaseStudy((await params).slug);
  if (!cs) notFound();

  const meta = [cs.company, cs.role, cs.industry].filter(Boolean).join(" · ");

  return (
    <article className="border-t border-rule pt-12 sm:pt-16">
      <p className="meta">
        <Link href="/work" className="quiet">Work</Link> / Case study
      </p>
      <h1 className="mt-3 text-[1.75rem] font-semibold sm:text-[2rem]">{cs.title}</h1>
      {meta ? <p className="mt-2 text-muted">{meta}</p> : null}

      <div className="prose mt-10 max-w-[40rem]" dangerouslySetInnerHTML={{ __html: render(cs.body) }} />

      <footer className="mt-12 border-t border-rule pt-6 text-[0.97rem]">
        {cs.original ? (
          <p className="text-muted">
            Originally written in Notion — <a href={cs.original}>read the original</a>.
          </p>
        ) : null}
        <Backlinks links={getBacklinks(`/work/${cs.slug}`)} />
      </footer>
    </article>
  );
}
