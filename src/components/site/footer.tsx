import Link from "next/link";
import { Instagram, MapPin } from "lucide-react";

export function Footer({
  studioName,
  tagline,
  subTagline,
  location,
  instagramUrl,
  instagramHandle,
}: {
  studioName: string;
  tagline: string;
  subTagline: string;
  location: string;
  instagramUrl: string;
  instagramHandle: string;
}) {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto w-full border-t border-line bg-paper px-4 pb-8 pt-12 md:px-6 md:pb-10 md:pt-16 safe-pb">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:items-start md:justify-between md:gap-10 md:text-left">
          {/* Wordmark */}
          <div>
            <div className="flex items-center justify-center gap-3 md:justify-start">
              <img
                src="/images/arcwave-01.png"
                alt="Arcwave Pilates"
                className="h-14 w-14 rounded-full object-cover"
              />
            </div>
            <p className="mt-4 font-serif text-lg italic text-teal">
              {subTagline}
            </p>
            <p className="mt-2 max-w-xs text-xs text-muted-foreground/80">{tagline}</p>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center gap-3 md:items-end">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-teal"
            >
              <Instagram className="h-4 w-4" />
              {instagramHandle}
            </a>
            <p className="inline-flex min-h-[44px] items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {location}
            </p>
            <a
              href="#faq"
              className="inline-flex min-h-[44px] items-center text-sm text-muted-foreground transition-colors hover:text-teal"
            >
              FAQs
            </a>
            <a
              href="#booking"
              className="inline-flex min-h-[44px] items-center text-sm text-muted-foreground transition-colors hover:text-teal"
            >
              Book a session
            </a>

            {/* Policies */}
            <div className="mt-2 flex flex-col items-center gap-2 md:items-end">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/70">
                Policies
              </p>
              <nav
                aria-label="Policies"
                className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm md:justify-end"
              >
                <Link
                  href="/terms"
                  className="inline-flex min-h-[44px] items-center text-muted-foreground transition-colors hover:text-teal"
                >
                  Terms &amp; Conditions
                </Link>
                <span aria-hidden className="text-muted-foreground/40">
                  ·
                </span>
                <Link
                  href="/privacy"
                  className="inline-flex min-h-[44px] items-center text-muted-foreground transition-colors hover:text-teal"
                >
                  Privacy Policy
                </Link>
                <span aria-hidden className="text-muted-foreground/40">
                  ·
                </span>
                <Link
                  href="/refund-policy"
                  className="inline-flex min-h-[44px] items-center text-muted-foreground transition-colors hover:text-teal"
                >
                  Refund Policy
                </Link>
              </nav>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-[11px] text-muted-foreground/70 sm:flex-row">
          <p>
            © {year} {studioName}. All rights reserved.
          </p>
          <p className="flex items-center gap-3">
            <a href="/admin" className="transition-colors hover:text-muted-foreground">
              Admin
            </a>
            <span>·</span>
            <span>Mindful movement, since 2026.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
