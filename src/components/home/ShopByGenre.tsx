import { GENRES } from "@/lib/genres";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GenreCard } from "@/components/genre-transition/GenreCard";

export function ShopByGenre() {
  return (
    <section className="bg-paper py-20 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Browse By Genre" title="Find a story in the mood you're after" />
        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {GENRES.map((genre) => (
            <li key={genre.slug}>
              <GenreCard genre={genre} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
