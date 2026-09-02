import Link from "next/link";
import { GENRES } from "@/lib/genres";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ShopByGenre() {
  return (
    <section className="bg-paper py-20 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Browse By Genre" title="Find a story in the mood you're after" />
        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {GENRES.map((genre) => (
            <li key={genre.slug}>
              <Link
                href={`/shop?genre=${genre.slug}`}
                className="group flex h-full flex-col justify-between gap-6 rounded-card border border-border bg-cream p-5 transition-colors hover:border-pink-secondary hover:bg-pink-primary/25"
              >
                <span className="font-display text-lg text-ink">{genre.name}</span>
                <span className="text-xs text-ink-50">{genre.blurb}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
