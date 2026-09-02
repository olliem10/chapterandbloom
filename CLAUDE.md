@AGENTS.md

# Chapter & Bloom

UK book & gift boutique ecommerce site. Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion.

## Stack

- Next.js 16, React 19, Tailwind v4 (CSS-first `@theme` in `src/app/globals.css` — no `tailwind.config`).
- Cart/gift state: React context (`src/lib/cart-context.tsx`) persisted to `localStorage`. No backend/database exists yet.
- `params`/`searchParams` are async (Next 15+ convention); dynamic route pages use the `PageProps<'/route'>` typed helper.

## Structure

- `src/lib/products.ts` — the 5 official packages (prices, inclusions, Stripe Payment Links). **Business-critical, do not change without confirming.** Bulk Professional was discontinued and removed entirely (Sept 2026) — do not re-add it.
- `src/lib/genres.ts` — the 7 official genres.
- `src/lib/build-a-book.ts` — cosmetic bookmark/sticker style options (no price variation; always £19.99; no Stripe link — never invent one).
- `src/lib/faq.ts` — FAQ content; entries with `pending: true` intentionally avoid inventing unconfirmed policy.
- `src/lib/cart-context.tsx` — cart provider/hook.
- `src/lib/genre-transition-config.ts` — per-genre cinematic transition timings (see below).
- `src/components/genre-transition/` — the "Browse by Genre" cinematic transition system: `GenreTransitionProvider` (context + `AnimatePresence` host, mounted in `layout.tsx`), `GenreTransitionOverlay` (picks the right genre component + drives navigation timing), `GenreCard` (the clickable trigger used by `ShopByGenre`), one component per genre (`RomanceTransition.tsx` etc.), `shared.tsx` (`TransitionFrame` shell + `MiniBook` + `Petal`), `ReducedMotionTransition.tsx` (short fade fallback). Only wired into the homepage "Browse by Genre" section — the shop page's inline genre chips stay instant on purpose (repeated cinematic replays while filtering would violate "don't delay shopping").
- `src/components/ui` — Button, Container, Logo (temporary text wordmark — no real logo file exists), SectionHeading.
- `src/components/home` — homepage sections.
- `src/components/product`, `src/components/shop` — product detail + shop grid pieces.
- `src/components/policy` — shared shell for the 4 policy pages.

## Brand constraints (non-negotiable, from the original brief)

- Colours: `#F8D7E6`, `#F3C5D8`, `#1A1A1A`, `#FFFFFF` — exposed as `pink-primary`, `pink-secondary`, `ink`, `paper` in Tailwind.
- Prices: Standard £9.99, Bulk Standard £11.99, Professional £14.99, Premium £19.99, Bulk Premium £24.99, Build A Book £19.99. (Bulk Professional discontinued.)
- Each package (except Build A Book) has a real Stripe Payment Link in `products.ts` (`stripeLink`), surfaced as a "Buy Now with Stripe" button on its product page. These are fixed-price links supplied by the business — never edit the URLs or invent new ones.
- Contact email: chapterandbloom@outlook.com. Domain (not yet connected): chapterandbloom.co.uk.
- Shipping: UK, 2–3 working days (dispatch vs. delivery not yet clarified).

## Known pending integrations (intentionally not faked)

- **Combined cart checkout** — the cart/`/checkout` flow still hands off to email; it isn't wired to Stripe because a static Payment Link can't represent a multi-item cart with gift metadata. Individual packages can be paid for directly via their product page's Stripe button instead.
- **Contact form** (`/api/contact`) — validates and logs server-side but does not deliver email anywhere yet.
- **Newsletter** — client-side validation only; honestly tells the user it isn't connected yet.
- **Shipping/Returns/Privacy/Terms** — real policy wording (returns window, duplicate-book policy, legal entity details) has not been confirmed; those pages show clearly marked "pending confirmation" placeholders instead of invented policy.
- **Book inventory/photography** — no fixed catalogue exists. Customers choose a genre preference (not a specific title) on product pages and Build A Book. Product imagery is an abstract placeholder (icon on a brand-coloured gradient), designed to be swapped for real photography without a redesign.
- **Reviews** — none exist yet; an honest empty state is shown instead of fabricated reviews.

## Commands

- `npm run dev` — dev server
- `npm run build` — production build (also runs typecheck)
- `npm run lint` — ESLint
