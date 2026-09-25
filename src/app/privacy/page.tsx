import type { Metadata } from "next";
import { PolicyShell, PolicySection } from "@/components/site/policy-shell";

export const metadata: Metadata = {
  title: "Privacy Policy — Arcwave Pilates",
  description:
    "How Arcwave Pilates collects, uses, and protects your personal information when you use our website and services.",
};

export default function PrivacyPage() {
  return (
    <PolicyShell
      eyebrow="Legal"
      title="Privacy Policy"
      lastUpdated="September 25, 2026"
      intro="Your privacy matters to us. This policy explains what information we collect, why we collect it, how we use it, and the choices you have. We aim to be plain-spoken about it — no jargon, no surprises."
    >
      <PolicySection id="overview" title="1. Who we are">
        <p>
          Arcwave Pilates (&ldquo;the Studio&rdquo;, &ldquo;we&rdquo;,
          &ldquo;us&rdquo;) is a Pilates studio based in Thiruvanmiyur,
          Chennai, India. We operate this website and provide group Reformer
          classes, private sessions, and membership plans. This Privacy
          Policy applies to the information we collect through this website and
          during your interactions with the Studio.
        </p>
      </PolicySection>

      <PolicySection id="collect" title="2. Information we collect">
        <p>
          We collect only the information needed to run the Studio and serve
          you well. That includes:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Account information</strong> — your name, email address,
            phone number, and a password you choose when you sign up.
          </li>
          <li>
            <strong>Booking & membership information</strong> — the plans you
            purchase, the classes you book, attendance records, and any
            carry-forward balances.
          </li>
          <li>
            <strong>Payment information</strong> — payment confirmations and
            transaction references. Card and bank details are handled by our
            payment partner, Razorpay, and are never stored on our own
            servers.
          </li>
          <li>
            <strong>Messages you send us</strong> — the contents of contact
            forms, review submissions, and any direct communication through
            Instagram, WhatsApp, or email.
          </li>
          <li>
            <strong>Technical information</strong> — basic device and browser
            information, and anonymous usage data that helps us keep the
            website running smoothly.
          </li>
        </ul>
      </PolicySection>

      <PolicySection id="use" title="3. How we use your information">
        <p>We use the information we collect to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Create and manage your account, bookings, and memberships.</li>
          <li>Process payments and issue invoices and receipts.</li>
          <li>
            Send you confirmations, reminders, and important notices about
            your classes and membership.
          </li>
          <li>
            Respond to your enquiries, feedback, and review submissions.
          </li>
          <li>
            Improve our classes, schedules, pricing, and the website itself.
          </li>
          <li>
            Meet our legal, accounting, and regulatory obligations in India.
          </li>
        </ul>
        <p>
          We do not sell your personal information to anyone, ever. We do not
          use your information to profile you for third-party advertising.
        </p>
      </PolicySection>

      <PolicySection id="sharing" title="4. When we share information">
        <p>
          We share information only when it is necessary to deliver our
          services or to meet a legal obligation. Specifically:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            With <strong>Razorpay</strong>, our payment partner, to process
            payments securely. Razorpay handles your card, UPI, and bank
            details under its own privacy and security standards.
          </li>
          <li>
            With the tools we use to run the website (for example, hosting,
            analytics, and email delivery), under contracts that require them
            to keep your information confidential and to use it only to
            provide their service to us.
          </li>
          <li>
            When required by law, regulation, or a valid legal process, or to
            protect the rights, safety, or property of the Studio, our
            clients, or others.
          </li>
        </ul>
      </PolicySection>

      <PolicySection id="cookies" title="5. Cookies & similar technologies">
        <p>
          This website uses a small number of cookies and similar technologies
          to keep you logged in, remember your preferences (such as your
          theme), and understand in aggregate how the site is used. You can
          disable cookies in your browser settings; some features (such as
          staying logged in) may not work without them.
        </p>
      </PolicySection>

      <PolicySection id="security" title="6. Data security">
        <p>
          We take reasonable technical and organisational measures to protect
          your information — including access controls, encryption in transit
          (HTTPS), and careful separation of payment data (which is handled
          entirely by Razorpay).
        </p>
        <p>
          No method of storage or transmission is perfectly secure, however.
          If you have any concerns about how your information is handled,
          please contact us and we will do our best to help.
        </p>
      </PolicySection>

      <PolicySection id="retention" title="7. How long we keep your information">
        <p>
          We keep your information for as long as your account is active, and
          for a reasonable period afterwards where required for accounting,
          tax, or legal reasons — typically up to seven years for financial
          records under Indian law. Booking and attendance data is generally
          retained for the lifetime of your membership and a short period
          after, then deleted or anonymised.
        </p>
      </PolicySection>

      <PolicySection id="rights" title="8. Your rights & choices">
        <p>You have the right to:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Ask us what personal information we hold about you, and to receive
            a copy of it.
          </li>
          <li>Ask us to correct information that is inaccurate or out of date.</li>
          <li>
            Ask us to delete your account and associated personal information,
            subject to our legal obligations to retain certain records.
          </li>
          <li>
            Opt out of any non-essential communications (such as newsletters)
            at any time.
          </li>
        </ul>
        <p>
          To exercise any of these rights, please contact us using the details
          at the end of this policy. We will respond within a reasonable
          time, usually a few working days.
        </p>
      </PolicySection>

      <PolicySection id="children" title="9. Children's privacy">
        <p>
          Our classes and memberships are intended for adults and, where
          appropriate, for minors accompanied by a parent or guardian. We do
          not knowingly collect personal information from children under 13
          without verifiable parental consent. If you believe we have
          collected information from a child in error, please contact us and
          we will delete it.
        </p>
      </PolicySection>

      <PolicySection id="links" title="10. Links to other websites">
        <p>
          This website may contain links to third-party sites (such as
          Instagram and Razorpay) that we do not control. Their privacy
          practices may differ from ours — we encourage you to read the
          privacy policies of any third-party site you visit.
        </p>
      </PolicySection>

      <PolicySection id="changes" title="11. Changes to this policy">
        <p>
          We may update this Privacy Policy from time to time. The
          &ldquo;Last updated&rdquo; date at the top reflects the most recent
          revision. Material changes will be highlighted on the website or
          communicated to you directly where appropriate.
        </p>
      </PolicySection>

      <PolicySection id="contact" title="12. Contact">
        <p>
          If you have any questions about this Privacy Policy or about how
          your information is handled, please contact us through the contact
          form on this website or via Instagram at{" "}
          <span className="text-teal">@arcwavepilates</span>.
        </p>
      </PolicySection>
    </PolicyShell>
  );
}
