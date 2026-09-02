import type { Metadata } from "next";
import Link from "next/link";
import { PolicyShell } from "@/components/policy/PolicyShell";
import { PendingBanner } from "@/components/policy/PendingBanner";

export const metadata: Metadata = {
  title: "Shipping",
  description: "Shipping information for Chapter & Bloom orders.",
};

export default function ShippingPage() {
  return (
    <PolicyShell eyebrow="Policy" title="Shipping">
      <p>
        Orders currently ship within <strong className="text-ink">2&ndash;3 working days</strong>.
      </p>

      <PendingBanner>
        <p className="font-semibold">A few details are still being confirmed:</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-ink-70">
          <li>Whether the 2&ndash;3 working days refers to dispatch, delivery, or both</li>
          <li>Courier and tracking details</li>
          <li>Whether shipping is offered outside the UK</li>
        </ul>
        <p className="mt-3">We&rsquo;ll update this page as soon as these are finalised.</p>
      </PendingBanner>

      <p>
        Have a question about an order?{" "}
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
