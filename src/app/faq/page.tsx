import type { Metadata } from "next";
import Link from "next/link";
import { FAQS } from "@/lib/faq";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about Chapter & Bloom bundles, genres, gifting and shipping.",
};

export default function FaqPage() {
  return (
    <div className="py-16 sm:py-20">
      <Container className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-50">FAQ</p>
        <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">Good to know</h1>
        <p className="mt-4 text-base text-ink-70">
          Can&rsquo;t find what you&rsquo;re after?{" "}
          <Link
            href="/contact"
            className="text-ink underline decoration-pink-secondary decoration-2 underline-offset-4"
          >
            Get in touch
          </Link>{" "}
          and we&rsquo;ll help directly.
        </p>

        <div className="mt-10 divide-y divide-border border-y border-border">
          {FAQS.map((item) => (
            <details key={item.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg text-ink">
                {item.question}
                <span
                  aria-hidden="true"
                  className="shrink-0 text-xl text-ink-50 transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-ink-70">{item.answer}</p>
              {item.pending ? (
                <span className="mt-2 inline-block text-xs font-medium uppercase tracking-wide text-ink-50">
                  Policy pending confirmation
                </span>
              ) : null}
            </details>
          ))}
        </div>
      </Container>
    </div>
  );
}
