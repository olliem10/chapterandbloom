import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why Chapter & Bloom exists — curated book bundles and thoughtful gifts for people who live between the pages.",
};

export default function AboutPage() {
  return (
    <div className="py-16 sm:py-20">
      <Container className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-50">About</p>
        <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">
          Made for those who live between the pages
        </h1>

        <div className="mt-8 space-y-6 text-base leading-relaxed text-ink-70 sm:text-lg">
          <p>
            A good book doesn&rsquo;t stay on the page. It follows you into the rest of the day &mdash; the
            character you can&rsquo;t stop thinking about, the world you keep half-living in long after
            you&rsquo;ve closed the cover. Chapter &amp; Bloom exists for that feeling: the space between
            one chapter and the next, where a story is still working on you.
          </p>
          <p>
            We build book bundles, not just book sales. Every package pairs a book with a small set of
            extras &mdash; a bookmark, a sticker, sometimes a pin badge or a keychain &mdash; chosen to
            make the object of reading feel as considered as the story itself. Nothing filler, nothing
            generic: just a few details that make a good book feel like an occasion.
          </p>
          <p>
            That&rsquo;s also why gifting sits at the centre of what we do. Handing someone a book you
            think they&rsquo;ll love is one of the more generous things you can do &mdash; you&rsquo;re
            betting on knowing them. Chapter &amp; Bloom is built to make that bet feel easy: choose a
            genre, add a message if it&rsquo;s a gift, and let the bundle do the rest.
          </p>
          <p>
            And for readers who want more say in what they get, Build A Book turns that same idea into
            something you shape yourself &mdash; a genre, a bookmark, a sticker, put together the way you
            want it.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/shop">Explore Book Bundles</ButtonLink>
          <ButtonLink href="/build-a-book" variant="outline">
            Build A Book
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}
