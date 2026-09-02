import { NextResponse } from "next/server";
import Stripe from "stripe";
import { BUILD_A_BOOK_PRICE, getProductBySlug } from "@/lib/products";
import { GENRES } from "@/lib/genres";

const VALID_GENRES = new Set<string>(GENRES.map((g) => g.name));
const MAX_QUANTITY = 20;
const MAX_METADATA_VALUE = 490; // Stripe caps metadata values at 500 chars

interface CheckoutRequestItem {
  productId?: unknown;
  quantity?: unknown;
  genre?: unknown;
  customization?: unknown;
  gift?: {
    isGift?: unknown;
    giftMessage?: unknown;
    giftReceipt?: unknown;
  };
}

/**
 * The client sends product identity + selections only. Prices are never
 * trusted from the client — they're always re-derived here from the same
 * data the rest of the site uses, so a tampered request can't change what's
 * actually charged.
 */
function resolveLineItem(raw: CheckoutRequestItem): Stripe.Checkout.SessionCreateParams.LineItem | { error: string } {
  const productId = typeof raw.productId === "string" ? raw.productId : "";

  const unitPriceGBP = productId === "build-a-book" ? BUILD_A_BOOK_PRICE : getProductBySlug(productId)?.priceGBP;
  const name = productId === "build-a-book" ? "Build A Book" : getProductBySlug(productId)?.name;

  if (unitPriceGBP === undefined || name === undefined) {
    return { error: `Unknown product in cart: "${productId}"` };
  }

  const quantity =
    typeof raw.quantity === "number" && Number.isInteger(raw.quantity)
      ? Math.min(MAX_QUANTITY, Math.max(1, raw.quantity))
      : 1;

  const genre = typeof raw.genre === "string" && VALID_GENRES.has(raw.genre) ? raw.genre : undefined;

  const customization: Record<string, string> = {};
  if (raw.customization && typeof raw.customization === "object") {
    for (const [key, value] of Object.entries(raw.customization as Record<string, unknown>).slice(0, 6)) {
      if (typeof value === "string" && value.trim()) {
        customization[key] = value.trim().slice(0, MAX_METADATA_VALUE);
      }
    }
  }

  const isGift = raw.gift?.isGift === true;
  const giftReceipt = raw.gift?.giftReceipt === true;
  const giftMessage =
    typeof raw.gift?.giftMessage === "string" ? raw.gift.giftMessage.trim().slice(0, MAX_METADATA_VALUE) : "";

  const descriptionParts: string[] = [];
  if (genre) descriptionParts.push(`Genre: ${genre}`);
  for (const [key, value] of Object.entries(customization)) descriptionParts.push(`${key}: ${value}`);
  if (isGift) {
    descriptionParts.push("Gift");
    if (giftReceipt) descriptionParts.push("Gift receipt requested");
    if (giftMessage) descriptionParts.push(`Message: ${giftMessage}`);
  }

  const metadata: Record<string, string> = {};
  if (genre) metadata.genre = genre;
  for (const [key, value] of Object.entries(customization)) {
    metadata[`customization_${key.toLowerCase().replace(/\s+/g, "_")}`] = value;
  }
  if (isGift) {
    metadata.gift = "true";
    if (giftReceipt) metadata.giftReceipt = "true";
    if (giftMessage) metadata.giftMessage = giftMessage;
  }

  return {
    quantity,
    price_data: {
      currency: "gbp",
      unit_amount: Math.round(unitPriceGBP * 100),
      product_data: {
        name,
        ...(descriptionParts.length ? { description: descriptionParts.join(" · ") } : {}),
        ...(Object.keys(metadata).length ? { metadata } : {}),
      },
    },
  };
}

export async function POST(request: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    console.error("STRIPE_SECRET_KEY is not set — cannot create a Checkout Session.");
    return NextResponse.json(
      { error: "Checkout isn't configured on this server yet. Please contact us to complete your order." },
      { status: 500 },
    );
  }

  const body = (await request.json().catch(() => null)) as { items?: CheckoutRequestItem[] } | null;
  const items = body?.items;

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  for (const raw of items) {
    const resolved = resolveLineItem(raw);
    if ("error" in resolved) {
      return NextResponse.json({ error: resolved.error }, { status: 400 });
    }
    line_items.push(resolved);
  }

  const origin = request.headers.get("origin") ?? new URL(request.url).origin;
  const stripe = new Stripe(secretKey);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${origin}/checkout?status=success`,
      cancel_url: `${origin}/checkout?status=cancelled`,
    });

    if (!session.url) {
      return NextResponse.json({ error: "Stripe did not return a checkout URL." }, { status: 502 });
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Failed to create Stripe Checkout Session:", error);
    return NextResponse.json({ error: "Could not start checkout. Please try again." }, { status: 502 });
  }
}
