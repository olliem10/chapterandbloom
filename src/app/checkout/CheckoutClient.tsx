"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { formatGBP } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Button, ButtonLink } from "@/components/ui/Button";

export function CheckoutClient() {
  const { items, hydrated, subtotalGBP, clear } = useCart();
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const clearedForSuccess = useRef(false);

  useEffect(() => {
    if (status === "success" && !clearedForSuccess.current) {
      clearedForSuccess.current = true;
      clear();
    }
  }, [status, clear]);

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            genre: item.genre,
            customization: item.customization,
            gift: item.gift,
          })),
        }),
      });
      const data: { url?: string; error?: string } = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Something went wrong starting checkout.");
      }
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong starting checkout.");
      setLoading(false);
    }
  }

  if (!hydrated) return null;

  if (status === "success") {
    return (
      <Container className="flex flex-col items-center py-24 text-center">
        <h1 className="font-display text-3xl text-ink sm:text-4xl">Thank you for your order!</h1>
        <p className="mt-2 max-w-sm text-sm text-ink-70">
          Your payment was successful. If we need anything else, we&rsquo;ll be in touch at the email
          address you gave Stripe.
        </p>
        <ButtonLink href="/shop" className="mt-8">
          Continue shopping
        </ButtonLink>
      </Container>
    );
  }

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

      {status === "cancelled" ? (
        <div className="mt-6 rounded-card border border-border-strong bg-paper p-5 text-sm text-ink-70">
          Checkout was cancelled &mdash; your cart is still here whenever you&rsquo;re ready.
        </div>
      ) : null}

      <p className="mt-4 text-sm text-ink-70">
        Review your order, then pay securely with Stripe. You&rsquo;ll be redirected to Stripe to complete
        payment and brought back here once you&rsquo;re done.
      </p>

      <ul className="mt-8 divide-y divide-border border-y border-border">
        {items.map((item) => (
          <li key={item.id} className="flex items-center justify-between gap-4 py-4 text-sm">
            <div>
              <p className="font-medium text-ink">
                {item.name}
                {item.quantity > 1 ? ` × ${item.quantity}` : ""}
              </p>
              {item.genre ? <p className="text-ink-50">Genre: {item.genre}</p> : null}
              {item.customization
                ? Object.entries(item.customization).map(([k, v]) => (
                    <p key={k} className="text-ink-50">
                      {k}: {v}
                    </p>
                  ))
                : null}
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

      {error ? (
        <p role="alert" className="mt-4 text-sm text-error">
          {error}
        </p>
      ) : null}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button size="lg" onClick={handleCheckout} disabled={loading}>
          {loading ? "Redirecting to Stripe…" : `Pay with Stripe — ${formatGBP(subtotalGBP)}`}
        </Button>
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
