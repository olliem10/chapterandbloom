"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { BookOpen, Check, Minus, Plus, Star, Truck } from "lucide-react";
import type { CartGiftOptions, Genre, Product } from "@/lib/types";
import { DEFAULT_GIFT_OPTIONS } from "@/lib/types";
import { getGenreBySlug } from "@/lib/genres";
import { useCart } from "@/lib/cart-context";
import { formatGBP } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { GenreSelect } from "@/components/product/GenreSelect";
import { GiftFields } from "@/components/product/GiftFields";
import { ProductCard } from "@/components/shop/ProductCard";

export function ProductDetailClient({ product, related }: { product: Product; related: Product[] }) {
  const searchParams = useSearchParams();
  const initialGenreSlug = searchParams.get("genre");
  const initialGenre = initialGenreSlug ? (getGenreBySlug(initialGenreSlug)?.name ?? null) : null;

  const { addItem } = useCart();
  const [genre, setGenre] = useState<Genre | null>(initialGenre);
  const [genreError, setGenreError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [gift, setGift] = useState<CartGiftOptions>(DEFAULT_GIFT_OPTIONS);
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    if (!genre) {
      setGenreError(true);
      return;
    }
    addItem({
      productId: product.id,
      name: product.name,
      unitPriceGBP: product.priceGBP,
      quantity,
      genre,
      gift,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2500);
  }

  return (
    <div className="py-12 sm:py-16">
      <Container className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="flex aspect-square items-center justify-center rounded-card border border-border bg-gradient-to-br from-pink-primary/50 via-cream to-paper">
          <BookOpen className="h-24 w-24 text-ink/20" strokeWidth={1} aria-hidden="true" />
        </div>

        <div>
          {product.bulk ? (
            <span className="inline-block rounded-full bg-ink px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-paper">
              Bulk
            </span>
          ) : null}
          <h1 className="mt-3 font-display text-3xl text-ink sm:text-4xl">{product.name}</h1>
          <p className="mt-2 font-display text-2xl tabular-nums text-ink">{formatGBP(product.priceGBP)}</p>
          <p className="mt-4 text-base text-ink-70">{product.description}</p>

          <div className="mt-6 rounded-card border border-border bg-paper p-5">
            <h2 className="text-sm font-semibold text-ink">What&rsquo;s included</h2>
            <ul className="mt-3 space-y-2">
              {product.includedItems.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-ink-70">
                  <Check className="h-4 w-4 text-pink-secondary" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <h2 className="text-sm font-semibold text-ink">Choose a genre</h2>
            <p className="mt-1 text-xs text-ink-50">
              We don&rsquo;t have a fixed book catalogue live yet, so tell us the genre you&rsquo;d like and
              we&rsquo;ll choose the book accordingly.
            </p>
            <div className="mt-3">
              <GenreSelect
                value={genre}
                onChange={(g) => {
                  setGenre(g);
                  setGenreError(false);
                }}
                invalid={genreError}
              />
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <span className="text-sm font-semibold text-ink">Quantity</span>
            <div className="flex items-center rounded-control border border-border-strong">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-10 w-10 cursor-pointer items-center justify-center text-ink hover:bg-ink/5"
              >
                <Minus className="h-4 w-4" aria-hidden="true" />
              </button>
              <span aria-live="polite" className="w-8 text-center text-sm tabular-nums text-ink">
                {quantity}
              </span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                className="flex h-10 w-10 cursor-pointer items-center justify-center text-ink hover:bg-ink/5"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="mt-6">
            <GiftFields value={gift} onChange={setGift} />
          </div>

          <Button size="lg" onClick={handleAddToCart} className="mt-6 w-full sm:w-auto">
            {added ? "Added to cart" : `Add to Cart — ${formatGBP(product.priceGBP * quantity)}`}
          </Button>
          <p role="status" aria-live="polite" className="mt-2 h-5 text-sm text-success">
            {added ? `${product.name} added to your cart.` : ""}
          </p>

          <div className="mt-2 flex items-center gap-2 text-sm text-ink-70">
            <Truck className="h-4 w-4" aria-hidden="true" />
            UK shipping in 2&ndash;3 working days.
          </div>
        </div>
      </Container>

      <Container className="mt-16">
        <h2 className="font-display text-2xl text-ink">Reviews</h2>
        <div className="mt-4 flex items-start gap-3 rounded-card border border-dashed border-border-strong bg-paper p-6">
          <Star className="mt-0.5 h-5 w-5 shrink-0 text-pink-secondary" aria-hidden="true" />
          <p className="text-sm text-ink-70">
            No reviews yet for this bundle &mdash; Chapter &amp; Bloom is brand new. Genuine reviews will
            appear here once real orders start arriving.
          </p>
        </div>
      </Container>

      {related.length > 0 ? (
        <Container className="mt-16">
          <h2 className="font-display text-2xl text-ink">You might also like</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </Container>
      ) : null}
    </div>
  );
}
