import type { Metadata } from "next";
import { PolicyShell } from "@/components/site/policy-shell";

export const metadata: Metadata = {
  title: "Refund Policy — Arcwave Pilates",
  description: "Arcwave Pilates refund and cancellation policy.",
};

export default function RefundPolicyPage() {
  return (
    <PolicyShell
      eyebrow="Legal"
      title="Refund Policy"
      lastUpdated="September 25, 2026"
    >
      {/* Content intentionally left blank for now.
          A full refund and cancellation policy will be published here
          before any paid plans go live. In the meantime, please contact
          the studio directly for any refund or cancellation questions. */}
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-white2 px-6 py-16 text-center md:px-10 md:py-24">
        <p className="font-serif text-3xl italic text-teal md:text-4xl">
          Our refund policy is being finalised.
        </p>
        <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground md:text-base">
          We&apos;re putting the finishing touches on a clear, fair refund and
          cancellation policy. It will be published here before any paid
          memberships go live.
        </p>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground md:text-base">
          In the meantime, if you have a specific question about a refund or
          cancellation, please reach out — we&apos;re happy to help.
        </p>
        <a
          href="/#contact"
          className="mt-8 inline-flex h-11 items-center gap-2 rounded-full bg-teal px-5 text-sm font-medium text-white transition-colors hover:bg-teal/90"
        >
          Contact the studio
        </a>
      </div>
    </PolicyShell>
  );
}
