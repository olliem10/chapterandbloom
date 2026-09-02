export type Genre =
  | "Romance"
  | "Thriller"
  | "Horror"
  | "Adventure"
  | "Fantasy"
  | "Science Fiction"
  | "Children's";

export type ProductTier = "standard" | "professional" | "premium";

export interface Product {
  id: string;
  slug: string;
  name: string;
  priceGBP: number;
  tagline: string;
  description: string;
  includedItems: string[];
  bulk: boolean;
  tier: ProductTier;
  featured: boolean;
  /** No fixed book inventory exists yet — customers choose a genre preference instead of a specific title. */
  genreSelectable: boolean;
  /** Real Stripe Payment Link for this exact package. Never invent one — omit if not supplied. */
  stripeLink?: string;
}

export interface CartGiftOptions {
  isGift: boolean;
  giftMessage: string;
  giftReceipt: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  unitPriceGBP: number;
  quantity: number;
  genre?: Genre;
  /** Build A Book selections (bookmark, sticker, etc.) — key/value labels for display. */
  customization?: Record<string, string>;
  gift: CartGiftOptions;
}

export const DEFAULT_GIFT_OPTIONS: CartGiftOptions = {
  isGift: false,
  giftMessage: "",
  giftReceipt: false,
};
