import type { Metadata } from "next";
import Link from "next/link";
import { PolicyShell } from "@/components/policy/PolicyShell";
import { PendingBanner } from "@/components/policy/PendingBanner";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Chapter & Bloom handles your data.",
};

export default function PrivacyPage() {
  return (
    <PolicyShell eyebrow="Policy" title="Privacy Policy">
      <PendingBanner>
        <p className="font-semibold">This is a working draft, not a finalised legal policy.</p>
        <p className="mt-2 text-ink-70">
          A full UK GDPR-compliant privacy policy &mdash; covering legal basis, data retention, third-party
          processors and your rights &mdash; is still being confirmed. What follows describes how the site
          currently, technically handles data, as accurately as we can.
        </p>
      </PendingBanner>

      <div>
        <h2 className="font-display text-xl text-ink">What we currently collect</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            <strong className="text-ink">Cart contents</strong> are stored only in your browser
            (localStorage) and are not sent to our servers until you choose to complete an order.
          </li>
          <li>
            <strong className="text-ink">Contact form submissions</strong> (name, email, order number,
            subject, message) are currently received by our website but not yet forwarded to a connected
            mailbox or third-party provider &mdash; that connection is still being set up.
          </li>
          <li>We do not currently use analytics or advertising trackers on this site.</li>
        </ul>
      </div>

      <p>
        Questions about your data?{" "}
        <Link
          href="/contact"
          className="text-ink underline decoration-pink-secondary decoration-2 underline-offset-4"
        >
          Contact us
        </Link>
        .
      </p>
    </PolicyShell>
  );
}
