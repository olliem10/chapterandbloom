"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { GENRES, getGenreBySlug } from "@/lib/genres";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/shop/ProductCard";
import { cn } from "@/lib/utils";
import type { ProductTier } from "@/lib/types";

type TierFilter = "all" | ProductTier;
type SortOption = "featured" | "price-asc" | "price-desc";

const TIER_LABELS: Record<TierFilter, string> = {
  all: "All",
  standard: "Standard",
  professional: "Professional",
  premium: "Premium",
};

export function ShopPageClient() {
  const searchParams = useSearchParams();
  const genreSlug = searchParams.get("genre");
  const genre = genreSlug ? getGenreBySlug(genreSlug) : undefined;

  const [query, setQuery] = useState("");
  const [tier, setTier] = useState<TierFilter>("all");
  const [sort, setSort] = useState<SortOption>("featured");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = PRODUCTS.filter((p) => {
      const matchesTier = tier === "all" || p.tier === tier;
      const matchesQuery =
        q.length === 0 ||
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.includedItems.some((item) => item.toLowerCase().includes(q));
      return matchesTier && matchesQuery;
    });

    if (sort === "price-asc") list = [...list].sort((a, b) => a.priceGBP - b.priceGBP);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.priceGBP - a.priceGBP);

    return list;
  }, [query, tier, sort]);

  return (
    <div className="py-14 sm:py-18">
      <Container>
        <SectionHeading
          eyebrow="Shop"
          title={genre ? `Bundles for ${genre.name} readers` : "All Book Bundles"}
          description={
            genre
              ? `Every bundle below can be set to ${genre.name} — we'll pre-select it when you choose your book.`
              : "Every package includes a book, chosen by genre, plus a set of thoughtful extras."
          }
        />

        {genre ? (
          <Link
            href="/shop"
            className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-border-strong bg-paper px-3 py-1.5 text-xs font-medium text-ink-70 hover:text-ink"
          >
            Shopping for {genre.name}
            <X className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        ) : null}

        <div className="mt-8 flex flex-col gap-4 border-y border-border py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-50"
              aria-hidden="true"
            />
            <label htmlFor="shop-search" className="sr-only">
              Search bundles
            </label>
            <input
              id="shop-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search bundles…"
              className="h-11 w-full rounded-control border border-border-strong bg-paper pl-9 pr-3 text-sm text-ink placeholder:text-ink-50 focus-visible:border-ink"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by package tier">
              {(Object.keys(TIER_LABELS) as TierFilter[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTier(t)}
                  aria-pressed={tier === t}
                  className={cn(
                    "h-9 cursor-pointer rounded-full border px-3.5 text-xs font-medium transition-colors",
                    tier === t
                      ? "border-ink bg-ink text-paper"
                      : "border-border-strong text-ink-70 hover:border-ink hover:text-ink",
                  )}
                >
                  {TIER_LABELS[t]}
                </button>
              ))}
            </div>

            <label htmlFor="shop-sort" className="sr-only">
              Sort bundles
            </label>
            <select
              id="shop-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="h-9 cursor-pointer rounded-full border border-border-strong bg-paper px-3 text-xs font-medium text-ink-70 focus-visible:border-ink"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        <nav aria-label="Genres" className="mt-5 flex flex-wrap gap-2">
          {GENRES.map((g) => (
            <Link
              key={g.slug}
              href={`/shop?genre=${g.slug}`}
              aria-current={genreSlug === g.slug ? "true" : undefined}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                genreSlug === g.slug
                  ? "border-ink bg-ink text-paper"
                  : "border-border-strong text-ink-70 hover:border-ink hover:text-ink",
              )}
            >
              {g.name}
            </Link>
          ))}
        </nav>

        {filtered.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} genreSlug={genreSlug ?? undefined} />
            ))}
          </div>
        ) : (
          <div className="mt-16 flex flex-col items-center rounded-card border border-dashed border-border-strong bg-paper py-16 text-center">
            <p className="font-display text-xl text-ink">No bundles match your search</p>
            <p className="mt-2 max-w-sm text-sm text-ink-70">
              Try a different search term, or clear your filters to see every bundle.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setTier("all");
              }}
              className="mt-6 cursor-pointer text-sm font-medium text-ink underline decoration-pink-secondary decoration-2 underline-offset-4"
            >
              Clear filters
            </button>
          </div>
        )}
      </Container>
    </div>
  );
}
