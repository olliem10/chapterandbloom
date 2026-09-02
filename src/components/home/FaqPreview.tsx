import { FAQS } from "@/lib/faq";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";

export function FaqPreview() {
  const preview = FAQS.filter((f) => !f.pending).slice(0, 4);

  return (
    <section className="bg-paper py-20 sm:py-24">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="FAQ" title="Good to know before you order" />
          <ButtonLink href="/faq" variant="outline" className="shrink-0">
            Read full FAQ
          </ButtonLink>
        </div>
        <dl className="mt-10 divide-y divide-border border-t border-border">
          {preview.map((item) => (
            <div key={item.question} className="py-6">
              <dt className="font-display text-lg text-ink">{item.question}</dt>
              <dd className="mt-2 text-sm text-ink-70">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
