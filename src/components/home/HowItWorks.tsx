import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const STEPS = [
  { n: "01", title: "Choose Your Story", body: "Pick a genre, or let Build A Book do the choosing with you." },
  { n: "02", title: "Choose Your Bundle", body: "Standard to Bulk Premium — pick how much you want included." },
  { n: "03", title: "Make It Yours", body: "Add a gift message, a gift receipt, or personalise with Build A Book." },
  { n: "04", title: "Enjoy Or Gift", body: "Arrives ready to read, or ready to hand straight to someone else." },
];

export function HowItWorks() {
  return (
    <section className="bg-paper py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="How It Works"
          title="From shelf to doorstep, without the fuss"
          align="center"
          className="mx-auto"
        />
        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <li key={step.n} className="flex flex-col gap-2">
              <span className="font-display text-3xl text-pink-secondary">{step.n}</span>
              <h3 className="font-display text-lg text-ink">{step.title}</h3>
              <p className="text-sm text-ink-70">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
