/**
 * Style options for Build A Book. These are cosmetic style names only — no
 * per-item pricing exists; Build A Book is always a fixed £19.99 regardless
 * of which styles are chosen.
 */
export const BOOKMARK_STYLES = ["Botanical Bloom", "Minimal Line", "Gilded Edge", "Classic Quote"] as const;
export const STICKER_STYLES = ["Floral Set", "Reading Mood", "Little Bloom", "Classic Emblem"] as const;

export type BookmarkStyle = (typeof BOOKMARK_STYLES)[number];
export type StickerStyle = (typeof STICKER_STYLES)[number];
