import type { Product } from "./types";

/**
 * Official Chapter & Bloom packages. Prices and inclusions are business-critical —
 * do not change without confirming against the current brief.
 */
export const PRODUCTS: Product[] = [
  {
    id: "standard",
    slug: "standard",
    name: "Standard",
    priceGBP: 9.99,
    tagline: "The perfect place to start.",
    description:
      "A beautifully chosen book paired with a sticker and a bookmark — a small, thoughtful introduction to Chapter & Bloom.",
    includedItems: ["Book", "1 Sticker", "Bookmark"],
    bulk: false,
    tier: "standard",
    featured: true,
    genreSelectable: true,
  },
  {
    id: "bulk-standard",
    slug: "bulk-standard",
    name: "Bulk Standard",
    priceGBP: 11.99,
    tagline: "A little more to unwrap.",
    description:
      "Everything in Standard, plus a pen — an easy way to make someone's reading moment feel a little more special.",
    includedItems: ["Book", "1 Sticker", "Pen", "Bookmark"],
    bulk: true,
    tier: "standard",
    featured: false,
    genreSelectable: true,
  },
  {
    id: "professional",
    slug: "professional",
    name: "Professional",
    priceGBP: 14.99,
    tagline: "For the dedicated reader.",
    description:
      "A curated book with three stickers, a pen and a pin badge — for readers who like a few extra details.",
    includedItems: ["Book", "3 Stickers", "Pen", "Pin Badge"],
    bulk: false,
    tier: "professional",
    featured: true,
    genreSelectable: true,
  },
  {
    id: "bulk-professional",
    slug: "bulk-professional",
    name: "Bulk Professional",
    priceGBP: 17.99,
    tagline: "The fuller bundle.",
    description:
      "Everything in Professional, plus a bookmark — a well-rounded gift with a little more inside.",
    includedItems: ["Book", "3 Stickers", "Pen", "Bookmark", "Pin Badge"],
    bulk: true,
    tier: "professional",
    featured: false,
    genreSelectable: true,
  },
  {
    id: "premium",
    slug: "premium",
    name: "Premium",
    priceGBP: 19.99,
    tagline: "Our most generous gift.",
    description:
      "A book, five stickers, a pen and a keychain — a generous bundle built for gifting.",
    includedItems: ["Book", "5 Stickers", "Pen", "Keychain"],
    bulk: false,
    tier: "premium",
    featured: true,
    genreSelectable: true,
  },
  {
    id: "bulk-premium",
    slug: "bulk-premium",
    name: "Bulk Premium",
    priceGBP: 24.99,
    tagline: "The full Chapter & Bloom experience.",
    description:
      "Everything included: book, five stickers, pen, bookmark, pin badge and keychain — our most complete package.",
    includedItems: ["Book", "5 Stickers", "Pen", "Bookmark", "Pin Badge", "Keychain"],
    bulk: true,
    tier: "premium",
    featured: false,
    genreSelectable: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured);
}

export function getRelatedProducts(slug: string, limit = 3): Product[] {
  const current = getProductBySlug(slug);
  if (!current) return PRODUCTS.slice(0, limit);
  return PRODUCTS.filter((p) => p.slug !== slug)
    .sort((a, b) => Math.abs(a.priceGBP - current.priceGBP) - Math.abs(b.priceGBP - current.priceGBP))
    .slice(0, limit);
}

export const BUILD_A_BOOK_PRICE = 19.99;
