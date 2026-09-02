"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatGBP } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export function CheckoutClient() {
  const { items, hydrated, subtotalGBP } = useCart();

  if (!hydrated) return null;

  if (items.length === 0) {
    return (
      <Container className="flex flex-col items-center py-24 text-center">
        <h1 className="font-display text-3xl text-ink">Nothing to check out yet</h1>
        <p className="mt-2 max-w-sm text-sm text-ink-70">
          Your cart is empty &mdash; add a bundle before heading to checkout.
        </p>
        <ButtonLink href="/shop" className="mt-8">
          Explore Book Bundles
        </ButtonLink>
      </Container>
    );
  }

  return (
    <Container className="py-12 sm:py-16">
      <h1 className="font-display text-3xl text-ink sm:text-4xl">Checkout</h1>

      <div className="mt-6 rounded-card border border-pink-secondary bg-pink-primary/25 p-5 text-sm text-ink">
        <p className="font-semibold">Secure payment isn&rsquo;t connected yet.</p>
        <p className="mt-1 text-ink-70">
          We&rsquo;re still finalising our payment provider, so orders can&rsquo;t be paid for on the site
          just yet. Review your order below, then email us and we&rsquo;ll take it from there.
        </p>
      </div>

      <ul className="mt-8 divide-y divide-border border-y border-border">
        {items.map((item) => (
          <li key={item.id} className="flex items-center justify-between gap-4 py-4 text-sm">
            <div>
              <p className="font-medium text-ink">
                {item.name}
                {item.quantity > 1 ? ` × ${item.quantity}` : ""}
              </p>
              {item.genre ? <p className="text-ink-50">Genre: {item.genre}</p> : null}
              {item.gift.isGift ? <p className="text-ink-50">Marked as a gift</p> : null}
            </div>
            <p className="tabular-nums text-ink">{formatGBP(item.unitPriceGBP * item.quantity)}</p>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between">
        <span className="font-semibold text-ink">Subtotal</span>
        <span className="font-display text-xl tabular-nums text-ink">{formatGBP(subtotalGBP)}</span>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a
          href="mailto:chapterandbloom@outlook.com?subject=Chapter%20%26%20Bloom%20order"
          className="inline-flex h-13 items-center justify-center rounded-control bg-ink px-7 text-base font-medium text-paper transition-colors hover:bg-ink/85"
        >
          Email us to complete your order
        </a>
        <Link
          href="/cart"
          className="inline-flex h-13 items-center justify-center rounded-control border border-ink px-7 text-base font-medium text-ink transition-colors hover:bg-ink hover:text-paper"
        >
          Back to cart
        </Link>
      </div>
    </Container>
  );
}
