import Link from "next/link";
import { ReactNode } from "react";

/**
 * Shared page shell for legal / policy pages (Terms, Privacy, Refund, …).
 *
 * Renders a sticky header with the studio logo + "back to site" pill, an
 * article body with eyebrow / title / last-updated line, and a slim sticky
 * footer with the cross-links to the other policies. Keeps every policy
 * page visually consistent without duplicating the chrome on each page.
 *
 * Server component — no client interactivity required.
 */
export function PolicyShell({
  eyebrow,
  title,
  intro,
  lastUpdated,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  lastUpdated?: string;
  children: ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col bg-paper">
      {/* Header */}
      <header className="border-b border-line bg-paper/80 backdrop-blur safe-pt">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-2 px-4 py-3 md:px-8 md:py-4">
          <a
            href="/"
            className="flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-teal"
          >
            <img
              src="/images/arcwave-01.png"
              alt="Arcwave Pilates"
              className="h-8 w-8 rounded-full object-cover"
            />
            <span className="hidden sm:inline">Arcwave Pilates</span>
          </a>
          <a
            href="/"
            className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line px-3 text-xs text-muted-foreground transition-colors hover:bg-lime/40 hover:text-teal"
          >
            ← Back to site
          </a>
        </div>
      </header>

      {/* Article body */}
      <article className="mx-auto w-full max-w-[760px] flex-1 px-4 py-12 md:px-8 md:py-20">
        <div className="mb-10">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-teal sm:text-xs">
            {eyebrow}
          </p>
          <h1 className="mt-3 text-4xl leading-tight text-ink md:text-5xl">
            {title}
          </h1>
          {lastUpdated && (
            <p className="mt-4 text-xs text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
          )}
          {intro && (
            <p className="mt-6 border-l-2 border-teal pl-4 text-lg italic leading-relaxed text-muted-foreground">
              {intro}
            </p>
          )}
        </div>

        <div className="space-y-10 text-base leading-relaxed text-ink">
          {children}
        </div>
      </article>

      {/* Slim footer with cross-links to the other policies */}
      <footer className="mt-auto border-t border-line bg-paper px-4 py-8 md:px-6 md:py-10 safe-pb">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 text-[11px] text-muted-foreground/70 sm:flex-row">
          <p>© {new Date().getFullYear()} Arcwave Pilates. All rights reserved.</p>
          <nav className="flex items-center gap-3">
            <Link
              href="/terms"
              className="transition-colors hover:text-teal"
            >
              Terms
            </Link>
            <span aria-hidden>·</span>
            <Link
              href="/privacy"
              className="transition-colors hover:text-teal"
            >
              Privacy
            </Link>
            <span aria-hidden>·</span>
            <Link
              href="/refund-policy"
              className="transition-colors hover:text-teal"
            >
              Refunds
            </Link>
            <span aria-hidden>·</span>
            <a
              href="/"
              className="transition-colors hover:text-muted-foreground"
            >
              Home
            </a>
          </nav>
        </div>
      </footer>
    </main>
  );
}

/**
 * Reusable section heading used inside PolicyShell bodies.
 * Tiny helper so individual pages don't repeat this markup three times.
 */
export function PolicySection({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20">
      <h2 className="text-2xl font-medium text-ink md:text-3xl">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-ink/90">
        {children}
      </div>
    </section>
  );
}
