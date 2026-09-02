"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { BOOKMARK_STYLES, STICKER_STYLES, type BookmarkStyle, type StickerStyle } from "@/lib/build-a-book";
import { BUILD_A_BOOK_PRICE } from "@/lib/products";
import { GENRES } from "@/lib/genres";
import type { CartGiftOptions, Genre } from "@/lib/types";
import { DEFAULT_GIFT_OPTIONS } from "@/lib/types";
import { useCart } from "@/lib/cart-context";
import { cn, formatGBP } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { GiftFields } from "@/components/product/GiftFields";

interface Errors {
  genre?: boolean;
  bookmark?: boolean;
  sticker?: boolean;
}

function OptionGrid<T extends string>({
  options,
  value,
  onChange,
  invalid,
  label,
}: {
  options: readonly T[];
  value: T | null;
  onChange: (v: T) => void;
  invalid?: boolean;
  label: string;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      aria-invalid={invalid}
      className="grid grid-cols-2 gap-3 sm:grid-cols-4"
    >
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          role="radio"
          aria-checked={value === opt}
          onClick={() => onChange(opt)}
          className={cn(
            "flex cursor-pointer flex-col items-center gap-2 rounded-card border p-4 text-center text-sm font-medium transition-colors",
            value === opt
              ? "border-ink bg-ink text-paper"
              : invalid
                ? "border-error text-ink-70"
                : "border-border-strong text-ink-70 hover:border-ink hover:text-ink",
          )}
        >
          {value === opt ? <Check className="h-4 w-4" aria-hidden="true" /> : null}
          {opt}
        </button>
      ))}
    </div>
  );
}

export function BuildABookClient() {
  const { addItem } = useCart();
  const [genre, setGenre] = useState<Genre | null>(null);
  const [bookmark, setBookmark] = useState<BookmarkStyle | null>(null);
  const [sticker, setSticker] = useState<StickerStyle | null>(null);
  const [gift, setGift] = useState<CartGiftOptions>(DEFAULT_GIFT_OPTIONS);
  const [errors, setErrors] = useState<Errors>({});
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    const nextErrors: Errors = { genre: !genre, bookmark: !bookmark, sticker: !sticker };
    setErrors(nextErrors);
    if (nextErrors.genre || nextErrors.bookmark || nextErrors.sticker) return;

    addItem({
      productId: "build-a-book",
      name: "Build A Book",
      unitPriceGBP: BUILD_A_BOOK_PRICE,
      quantity: 1,
      genre: genre!,
      customization: { Bookmark: bookmark!, Sticker: sticker! },
      gift,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2500);
  }

  return (
    <div className="py-12 sm:py-16">
      <Container className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-start lg:gap-16">
        <div className="space-y-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-50">Build A Book</p>
            <h1 className="mt-2 font-display text-3xl text-ink sm:text-4xl">Make it entirely yours</h1>
            <p className="mt-3 max-w-xl text-base text-ink-70">
              Choose a genre, a bookmark and a sticker. Your custom bundle updates live as you go &mdash;
              all for a fixed {formatGBP(BUILD_A_BOOK_PRICE)}.
            </p>
          </div>

          <section>
            <h2 className="text-sm font-semibold text-ink">1. Choose a genre</h2>
            <div role="radiogroup" aria-label="Choose a genre" aria-invalid={errors.genre} className="mt-3 flex flex-wrap gap-2">
              {GENRES.map((g) => (
                <button
                  key={g.slug}
                  type="button"
                  role="radio"
                  aria-checked={genre === g.name}
                  onClick={() => {
                    setGenre(g.name);
                    setErrors((e) => ({ ...e, genre: false }));
                  }}
                  className={cn(
                    "cursor-pointer rounded-full border px-3.5 py-2 text-sm font-medium transition-colors",
                    genre === g.name
                      ? "border-ink bg-ink text-paper"
                      : errors.genre
                        ? "border-error text-ink-70"
                        : "border-border-strong text-ink-70 hover:border-ink hover:text-ink",
                  )}
                >
                  {g.name}
                </button>
              ))}
            </div>
            {errors.genre ? (
              <p role="alert" className="mt-2 text-sm text-error">
                Please choose a genre.
              </p>
            ) : null}
          </section>

          <section>
            <h2 className="text-sm font-semibold text-ink">2. Choose a bookmark</h2>
            <div className="mt-3">
              <OptionGrid
                label="Choose a bookmark"
                options={BOOKMARK_STYLES}
                value={bookmark}
                onChange={(v) => {
                  setBookmark(v);
                  setErrors((e) => ({ ...e, bookmark: false }));
                }}
                invalid={errors.bookmark}
              />
            </div>
            {errors.bookmark ? (
              <p role="alert" className="mt-2 text-sm text-error">
                Please choose a bookmark.
              </p>
            ) : null}
          </section>

          <section>
            <h2 className="text-sm font-semibold text-ink">3. Choose a sticker</h2>
            <div className="mt-3">
              <OptionGrid
                label="Choose a sticker"
                options={STICKER_STYLES}
                value={sticker}
                onChange={(v) => {
                  setSticker(v);
                  setErrors((e) => ({ ...e, sticker: false }));
                }}
                invalid={errors.sticker}
              />
            </div>
            {errors.sticker ? (
              <p role="alert" className="mt-2 text-sm text-error">
                Please choose a sticker.
              </p>
            ) : null}
          </section>

          <section>
            <h2 className="text-sm font-semibold text-ink">4. Gift options</h2>
            <div className="mt-3">
              <GiftFields value={gift} onChange={setGift} />
            </div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24">
          <div className="rounded-card border border-border bg-paper p-6 shadow-soft">
            <h2 className="font-display text-xl text-ink">Your bundle</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-ink-70">Genre</dt>
                <dd className="font-medium text-ink">{genre ?? "Not chosen"}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-ink-70">Bookmark</dt>
                <dd className="font-medium text-ink">{bookmark ?? "Not chosen"}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-ink-70">Sticker</dt>
                <dd className="font-medium text-ink">{sticker ?? "Not chosen"}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-border pt-3">
                <dt className="font-semibold text-ink">Price</dt>
                <dd className="font-display text-lg tabular-nums text-ink">{formatGBP(BUILD_A_BOOK_PRICE)}</dd>
              </div>
            </dl>

            <Button size="lg" onClick={handleAddToCart} className="mt-6 w-full">
              {added ? "Added to cart" : "Add to Cart"}
            </Button>
            <p role="status" aria-live="polite" className="mt-2 h-5 text-sm text-success">
              {added ? "Your custom bundle was added to your cart." : ""}
            </p>
          </div>
        </aside>
      </Container>
    </div>
  );
}
