import { Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Reviews() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Reviews" title="What readers think" align="center" className="mx-auto" />
        <div className="mx-auto mt-10 flex max-w-md flex-col items-center rounded-card border border-dashed border-border-strong bg-paper p-10 text-center">
          <Star className="h-6 w-6 text-pink-secondary" strokeWidth={1.5} aria-hidden="true" />
          <p className="mt-4 font-display text-lg text-ink">We&rsquo;re just getting started</p>
          <p className="mt-2 text-sm text-ink-70">
            Chapter &amp; Bloom is brand new, so we don&rsquo;t have customer reviews to show just yet. Once
            real orders start arriving, genuine reviews will appear here.
          </p>
        </div>
      </Container>
    </section>
  );
}
