import { Gift, MessageSquareHeart, Receipt } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const FEATURES = [
  {
    icon: MessageSquareHeart,
    title: "A message that means something",
    body: "Add a personal note at checkout — we'll make sure it arrives with the order.",
  },
  {
    icon: Receipt,
    title: "Gift receipts on request",
    body: "Choose a price-free receipt so the gift stays a surprise, not a spoiler.",
  },
  {
    icon: Gift,
    title: "Considered, not corporate",
    body: "Every bundle is put together to feel like it was chosen for someone, not shipped off a shelf.",
  },
];

export function GiftExperience() {
  return (
    <section className="bg-pink-primary/25 py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Gifting"
          title="Made to be given, not just bought"
          description="Chapter & Bloom is built around the moment someone opens it."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-card bg-paper p-6 shadow-soft">
              <Icon className="h-5 w-5 text-ink" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="mt-4 font-display text-lg text-ink">{title}</h3>
              <p className="mt-2 text-sm text-ink-70">{body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
