import type { Metadata } from "next";
import Link from "next/link";
import { PolicyShell } from "@/components/policy/PolicyShell";
import { PendingBanner } from "@/components/policy/PendingBanner";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for using the Chapter & Bloom website.",
};

export default function TermsPage() {
  return (
    <PolicyShell eyebrow="Policy" title="Terms & Conditions">
      <PendingBanner>
        <p className="font-semibold">Our full terms &amp; conditions are being finalised.</p>
        <p className="mt-2 text-ink-70">
          This includes our legal business details, governing law, order acceptance terms and liability
          wording. We&rsquo;ll publish the complete version here before taking live orders.
        </p>
      </PendingBanner>

      <div>
        <h2 className="font-display text-xl text-ink">What we can confirm today</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            All prices shown on this site are in GBP (£) and include the exact package contents listed on
            each product page.
          </li>
          <li>Secure payment processing is not yet live &mdash; no payment is taken through this site at present.</li>
        </ul>
      </div>

      <p>
        Questions?{" "}
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
