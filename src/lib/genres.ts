import type { Genre } from "./types";

export interface GenreInfo {
  name: Genre;
  slug: string;
  blurb: string;
}

/**
 * These are the only official Chapter & Bloom genres. Do not add to this list
 * without confirming the product catalogue impact first.
 */
export const GENRES: GenreInfo[] = [
  { name: "Romance", slug: "romance", blurb: "Slow-burns, swoony arcs and happily-ever-afters." },
  { name: "Thriller", slug: "thriller", blurb: "Page-turners built for one-more-chapter nights." },
  { name: "Horror", slug: "horror", blurb: "For readers who like the lights on and the door locked." },
  { name: "Adventure", slug: "adventure", blurb: "Journeys, quests and stories that go the distance." },
  { name: "Fantasy", slug: "fantasy", blurb: "Other worlds, old magic and maps worth getting lost in." },
  { name: "Science Fiction", slug: "science-fiction", blurb: "Big ideas, strange futures and questions worth asking." },
  { name: "Children's", slug: "childrens", blurb: "Stories meant to be read aloud, again and again." },
];

export function getGenreBySlug(slug: string): GenreInfo | undefined {
  return GENRES.find((g) => g.slug === slug);
}
