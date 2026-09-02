import { Gift, Heart, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const POINTS = [
  {
    icon: Sparkles,
    title: "Curated, not mass-produced",
    body: "Every bundle is put together with care — chosen for the reader, not pulled off a shelf at random.",
  },
  {
    icon: Gift,
    title: "Built for gifting",
    body: "Gift messages, gift receipts and packaging that feels like an occasion, not an afterthought.",
  },
  {
    icon: Heart,
    title: "For people who live in books",
    body: "We know a good bundle is more than a book — it's the small extras that make reading feel like a ritual.",
  },
];

export function WhyUs() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Why Chapter & Bloom"
          title="A bookshop that feels like a gift in itself"
          align="center"
          className="mx-auto"
        />
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {POINTS.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex flex-col items-center text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-primary/60">
                <Icon className="h-5 w-5 text-ink" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-lg text-ink">{title}</h3>
              <p className="mt-2 text-sm text-ink-70">{body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
