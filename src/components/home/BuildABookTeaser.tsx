import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function BuildABookTeaser() {
  return (
    <section className="py-20 sm:py-24">
      <Container className="overflow-hidden rounded-card border border-border bg-ink px-8 py-14 text-center sm:px-16">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-pink-secondary">Build A Book</p>
        <h2 className="mx-auto mt-4 max-w-xl font-display text-3xl leading-tight text-paper sm:text-4xl">
          Choose the genre. Choose the extras. Make it entirely yours.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-paper/70 sm:text-base">
          Our fully custom bundle — pick a genre, a bookmark and a sticker, and watch your package come
          together, all for £19.99.
        </p>
        <ButtonLink href="/build-a-book" variant="secondary" size="lg" className="mt-8">
          Start Building
        </ButtonLink>
      </Container>
    </section>
  );
}
