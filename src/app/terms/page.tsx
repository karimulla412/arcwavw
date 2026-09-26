import type { Metadata } from "next";
import { PolicyShell, PolicySection } from "@/components/site/policy-shell";

export const metadata: Metadata = {
  title: "Terms & Conditions — Arcwave Pilates",
  description:
    "The terms and conditions that govern your use of Arcwave Pilates memberships, classes, and this website.",
};

export default function TermsPage() {
  return (
    <PolicyShell
      eyebrow="Legal"
      title="Terms & Conditions"
      lastUpdated="September 25, 2026"
      intro="Welcome to Arcwave Pilates. These terms govern your relationship with our studio, our website, and the classes and memberships we offer. Please read them carefully — by booking a class, purchasing a membership, or using this site, you agree to the terms below."
    >
      <PolicySection id="acceptance" title="1. Acceptance of these terms">
        <p>
          By accessing this website or attending any class at Arcwave Pilates
          (&ldquo;the Studio&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;), you
          confirm that you have read, understood, and accept these Terms &
          Conditions in full. If you do not agree with any part of these terms,
          please do not book a class, purchase a membership, or use the website.
        </p>
        <p>
          If you are booking on behalf of someone else (for example, a family
          member or a minor), you confirm that you have their permission to do
          so and that they have also agreed to these terms.
        </p>
      </PolicySection>

      <PolicySection id="studio" title="2. About the studio">
        <p>
          Arcwave Pilates is a Pilates studio based in Thiruvanmiyur, Chennai,
          India, offering group Reformer classes, private one-to-one sessions,
          and structured membership plans. The Studio reserves the right to
          update class schedules, trainer assignments, pricing, and operating
          hours at any time without prior notice, subject to the commitments
          already made to active members.
        </p>
      </PolicySection>

      <PolicySection id="accounts" title="3. Accounts & bookings">
        <p>
          To book a class or buy a membership you must create an account using
          your name, a valid email address, and a working phone number. You are
          responsible for keeping your login credentials confidential and for
          any activity carried out under your account. If you believe your
          account has been compromised, please contact us immediately.
        </p>
        <p>
          You agree to provide accurate, current information at all times. We
          may suspend or close accounts that contain false, misleading, or
          incomplete details.
        </p>
      </PolicySection>

      <PolicySection id="memberships" title="4. Memberships, plans & pricing">
        <p>
          Memberships and class packs are sold on the terms described on the
          pricing page at the time of purchase. Each plan specifies its
          duration (in months), the number of classes per week, the total
          number of sessions included, any bonus sessions, and the price.
        </p>
        <p>
          A membership becomes <strong>active</strong> only after the full
          payment for that plan has been successfully received. Trial classes,
          where offered, are subject to availability and may be limited to one
          per person.
        </p>
        <p>
          The Studio may revise plan prices and features at any time. Any
          change applies only to purchases made after the change takes effect —
          your existing active membership continues on the terms you paid for.
        </p>
      </PolicySection>

      <PolicySection id="carry-forward" title="5. Carry-forward of sessions">
        <p>
          Where a plan allows carry-forward, any unused sessions from a
          previous active membership that is close to expiry (within 30 days
          of its end date) or recently expired (within the last 30 days) may be
          carried into a new membership purchased within that window. The
          number of sessions carried forward is capped by the new plan&apos;s
          carry-forward policy and is recorded in the membership notes.
        </p>
        <p>
          Carry-forward is not a cash refund or credit toward another plan. It
          applies only to sessions, and only once, at the moment of renewal.
        </p>
      </PolicySection>

      <PolicySection id="booking-cancellation" title="6. Booking, rescheduling & cancellations">
        <p>
          Class sizes are limited and many sessions fill up. Once a slot is
          locked to your membership it is reserved for you. If you cannot
          attend, please cancel your booking through your account dashboard at
          the earliest, so the slot can be released to another member or to
          the waitlist.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Cancellations made more than 12 hours before the scheduled class
            time will release the session back to your membership balance.
          </li>
          <li>
            Late cancellations (less than 12 hours before class) or no-shows may
            be counted as a used session at the Studio&apos;s discretion.
          </li>
          <li>
            Repeated no-shows may result in your booking privileges being
            restricted.
          </li>
        </ul>
        <p>
          The Studio reserves the right to cancel or reschedule a class where a
          trainer is unavailable or for other operational reasons. Where
          possible, we will offer a substitute slot or a credit toward a future
          class.
        </p>
      </PolicySection>

      <PolicySection id="payment" title="7. Payment">
        <p>
          All payments on this website are processed securely through Razorpay.
          By making a payment you authorise us (and our payment partner) to
          charge the displayed amount in Indian Rupees (₹) to your chosen
          payment method.
        </p>
        <p>
          Prices include applicable taxes unless otherwise stated at the time
          of purchase. A confirmation and an invoice link will be made
          available in your account after a successful payment.
        </p>
      </PolicySection>

      <PolicySection id="conduct" title="8. Studio code of conduct">
        <p>
          We work hard to keep the Studio a calm, respectful, and safe space
          for everyone. By attending a class you agree to:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Arrive on time and stay for the full session where possible.</li>
          <li>
            Follow the trainer&apos;s instructions, including any safety or
            equipment guidance.
          </li>
          <li>
            Treat trainers, fellow clients, and Studio property with respect.
          </li>
          <li>
            Refrain from using your phone in the practice area, and from any
            behaviour that disrupts the class.
          </li>
        </ul>
        <p>
          The Studio may refuse entry, ask a client to leave a session, or
          cancel a membership without refund where conduct is, in our
          reasonable judgement, unsafe, abusive, or disruptive.
        </p>
      </PolicySection>

      <PolicySection id="health" title="9. Health, safety & medical clearance">
        <p>
          Pilates is a physical practice. You are responsible for assessing
          your own suitability for participation. If you have any injury,
          medical condition, are pregnant, or are recovering from surgery,
          please consult your doctor before booking and inform your trainer
          before class begins.
        </p>
        <p>
          You agree to follow your trainer&apos;s instructions and to stop any
          movement that causes pain or discomfort. The Studio and its trainers
          are not medical professionals and do not provide medical advice.
        </p>
      </PolicySection>

      <PolicySection id="liability" title="10. Limitation of liability">
        <p>
          To the extent permitted by law, the Studio, its owners, trainers,
          and staff are not liable for any injury, loss, or damage sustained
          on the premises or during an online session, except where caused by
          our negligence or wilful misconduct. You participate in all classes
          at your own risk.
        </p>
        <p>
          We are not liable for any indirect, incidental, or consequential
          loss arising from your use of this website or the Studio&apos;s
          services.
        </p>
      </PolicySection>

      <PolicySection id="ip" title="11. Intellectual property">
        <p>
          All content on this website — including the Arcwave Pilates name and
          logo, photography, class descriptions, and written material — is owned
          by the Studio or used with permission. You may not copy, reproduce,
          or reuse any of it for commercial purposes without our written
          consent.
        </p>
        <p>
          You may not record, photograph, or stream a class without the
          Studio&apos;s prior permission and the consent of other clients
          present.
        </p>
      </PolicySection>

      <PolicySection id="changes" title="12. Changes to these terms">
        <p>
          We may update these Terms & Conditions from time to time. The
          &ldquo;Last updated&rdquo; date at the top of this page reflects the
          most recent revision. Continued use of the website or attendance at
          the Studio after a change indicates your acceptance of the updated
          terms.
        </p>
      </PolicySection>

      <PolicySection id="governing-law" title="13. Governing law">
        <p>
          These terms are governed by the laws of India. Any dispute arising
          out of or in connection with them shall be subject to the exclusive
          jurisdiction of the courts in Chennai, Tamil Nadu.
        </p>
      </PolicySection>

      <PolicySection id="contact" title="14. Contact">
        <p>
          If you have any questions about these Terms & Conditions, please
          reach us through the contact form on this website, or via Instagram
          at <span className="text-teal">@arcwavepilates</span>. We will
          respond as soon as we can.
        </p>
      </PolicySection>
    </PolicyShell>
  );
}
