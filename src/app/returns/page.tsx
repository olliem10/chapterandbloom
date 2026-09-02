import type { Metadata } from "next";
import Link from "next/link";
import { PolicyShell } from "@/components/policy/PolicyShell";
import { PendingBanner } from "@/components/policy/PendingBanner";

export const metadata: Metadata = {
  title: "Returns & Refunds",
  description: "Returns and refunds information for Chapter & Bloom.",
};

export default function ReturnsPage() {
  return (
    <PolicyShell eyebrow="Policy" title="Returns & Refunds">
      <PendingBanner>
        <p className="font-semibold">Our returns and refunds policy is being finalised.</p>
        <p className="mt-2 text-ink-70">
          This includes our returns window, condition requirements, how refunds are processed, and our
          policy on duplicate books. We&rsquo;ll publish the full details here as soon as they&rsquo;re
          confirmed.
        </p>
      </PendingBanner>

      <p>
        In the meantime, if you have an issue with an order, please{" "}
        <Link
          href="/contact"
          className="text-ink underline decoration-pink-secondary decoration-2 underline-offset-4"
        >
          get in touch
        </Link>{" "}
        and we&rsquo;ll help directly.
      </p>
    </PolicyShell>
  );
}
