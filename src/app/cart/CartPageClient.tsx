"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatGBP } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { GiftFields } from "@/components/product/GiftFields";

export function CartPageClient() {
  const { items, hydrated, removeItem, updateQuantity, updateGift, subtotalGBP } = useCart();
  const [openGiftFor, setOpenGiftFor] = useState<string | null>(null);

  if (!hydrated) {
    return (
      <Container className="py-20">
        <p className="text-sm text-ink-50">Loading your cart&hellip;</p>
      </Container>
    );
  }

  if (items.length === 0) {
    return (
      <Container className="flex flex-col items-center py-24 text-center">
        <ShoppingBag className="h-10 w-10 text-ink/20" aria-hidden="true" />
        <h1 className="mt-4 font-display text-3xl text-ink">Your cart is empty</h1>
        <p className="mt-2 max-w-sm text-sm text-ink-70">
          Looks like you haven&rsquo;t added anything yet. Browse our bundles or build your own.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/shop">Explore Book Bundles</ButtonLink>
          <ButtonLink href="/build-a-book" variant="outline">
            Build A Book
          </ButtonLink>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-12 sm:py-16">
      <h1 className="font-display text-3xl text-ink sm:text-4xl">Your Cart</h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <ul className="divide-y divide-border border-y border-border">
          {items.map((item) => (
            <li key={item.id} className="py-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-lg text-ink">{item.name}</h2>
                  <dl className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-70">
                    {item.genre ? (
                      <div className="flex gap-1">
                        <dt className="text-ink-50">Genre:</dt>
                        <dd>{item.genre}</dd>
                      </div>
                    ) : null}
                    {item.customization
                      ? Object.entries(item.customization).map(([k, v]) => (
                          <div key={k} className="flex gap-1">
                            <dt className="text-ink-50">{k}:</dt>
                            <dd>{v}</dd>
                          </div>
                        ))
                      : null}
                  </dl>
                  {item.gift.isGift ? (
                    <span className="mt-2 inline-block rounded-full bg-pink-primary/50 px-2.5 py-1 text-xs font-medium text-ink">
                      Gift{item.gift.giftReceipt ? " · Gift receipt" : ""}
                    </span>
                  ) : null}
                </div>

                <p className="font-display text-lg tabular-nums text-ink">
                  {formatGBP(item.unitPriceGBP * item.quantity)}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-4">
                <div className="flex items-center rounded-control border border-border-strong">
                  <button
                    type="button"
                    aria-label={`Decrease quantity of ${item.name}`}
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="flex h-9 w-9 cursor-pointer items-center justify-center text-ink hover:bg-ink/5"
                  >
                    <Minus className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <span className="w-7 text-center text-sm tabular-nums text-ink">{item.quantity}</span>
                  <button
                    type="button"
                    aria-label={`Increase quantity of ${item.name}`}
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="flex h-9 w-9 cursor-pointer items-center justify-center text-ink hover:bg-ink/5"
                  >
                    <Plus className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setOpenGiftFor(openGiftFor === item.id ? null : item.id)}
                  className="cursor-pointer text-sm font-medium text-ink underline decoration-pink-secondary decoration-2 underline-offset-4"
                >
                  {openGiftFor === item.id ? "Close gift options" : "Edit gift options"}
                </button>

                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="ml-auto flex cursor-pointer items-center gap-1.5 text-sm font-medium text-error"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                  Remove
                </button>
              </div>

              {openGiftFor === item.id ? (
                <div className="mt-4">
                  <GiftFields value={item.gift} onChange={(gift) => updateGift(item.id, gift)} />
                </div>
              ) : null}
            </li>
          ))}
        </ul>

        <aside>
          <div className="rounded-card border border-border bg-paper p-6 shadow-soft">
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink-70">Subtotal</span>
              <span className="font-display text-lg tabular-nums text-ink">{formatGBP(subtotalGBP)}</span>
            </div>
            <p className="mt-2 text-xs text-ink-50">
              Shipping calculated at checkout. UK delivery in 2&ndash;3 working days.
            </p>
            <ButtonLink href="/checkout" size="lg" className="mt-6 w-full">
              Continue to Checkout
            </ButtonLink>
            <Link
              href="/shop"
              className="mt-4 block text-center text-sm font-medium text-ink-70 hover:text-ink"
            >
              Continue shopping
            </Link>
          </div>
        </aside>
      </div>
    </Container>
  );
}
