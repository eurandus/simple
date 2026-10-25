import Link from "next/link";

export default function NotFound() {
  return (
    <div className="border-t border-rule pt-12 sm:pt-16">
      <h1 className="text-[1.75rem] font-semibold">Page not found</h1>
      <p className="mt-2 text-muted">This page doesn&apos;t exist, or it has moved.</p>
      <p className="mt-6">
        <Link href="/">Go home →</Link>
      </p>
    </div>
  );
}
