"use client";

import { motion, useReducedMotion, type Transition } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const PETALS = [
  { x: -118, y: -36, delay: 0.95, size: 20, rotate: -18 },
  { x: 104, y: -54, delay: 1.1, size: 15, rotate: 22 },
  { x: -66, y: -86, delay: 1.25, size: 13, rotate: 6 },
  { x: 86, y: -104, delay: 1.4, size: 18, rotate: -12 },
  { x: 8, y: -122, delay: 1.55, size: 11, rotate: 28 },
  { x: -132, y: -96, delay: 1.7, size: 10, rotate: -30 },
];

function Petal({ size }: { size: number }) {
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 20 24" fill="none" aria-hidden="true">
      <path
        d="M10 0C10 0 20 8 20 15C20 20 15.5 24 10 24C4.5 24 0 20 0 15C0 8 10 0 10 0Z"
        className="fill-pink-secondary"
      />
    </svg>
  );
}

export function Hero() {
  const reduceMotion = useReducedMotion();

  const leafTransition: Transition = reduceMotion
    ? { duration: 0 }
    : { duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] };

  const textTransition = (delay: number): Transition =>
    reduceMotion ? { duration: 0 } : { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] };

  return (
    <section className="relative overflow-hidden bg-cream">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-24 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-pink-primary/40 blur-3xl"
      />

      <Container className="relative flex flex-col items-center gap-10 py-20 text-center sm:gap-14 sm:py-28">
        <div className="relative h-[190px] w-full max-w-md sm:h-[230px]">
          {/* Botanical elements emerging from the spine */}
          {PETALS.map((p, i) => (
            <motion.span
              key={i}
              className="absolute bottom-14 left-1/2 sm:bottom-[68px]"
              style={{ marginLeft: p.x }}
              initial={reduceMotion ? { opacity: 0.85, y: p.y, rotate: p.rotate } : { opacity: 0, y: 0, rotate: 0, scale: 0.6 }}
              animate={{ opacity: [0, 0.9, 0.8], y: p.y, rotate: p.rotate, scale: 1 }}
              transition={{ duration: 1.3, delay: reduceMotion ? 0 : p.delay, ease: "easeOut" }}
            >
              <Petal size={p.size} />
            </motion.span>
          ))}

          {/* Book, opening from a closed spine-on state */}
          <div
            className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-end"
            style={{ perspective: 700 }}
            aria-hidden="true"
          >
            <motion.div
              className="relative h-[110px] w-[104px] overflow-hidden rounded-l-xl border border-ink/15 bg-paper shadow-soft sm:h-[140px] sm:w-[128px]"
              style={{ transformOrigin: "right center" }}
              initial={{ rotateY: 82 }}
              animate={{ rotateY: 18 }}
              transition={leafTransition}
            >
              <span
                aria-hidden="true"
                className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-ink/10 to-transparent"
              />
              <span
                aria-hidden="true"
                className="absolute inset-y-3 right-3 w-px bg-ink/10 sm:right-4"
              />
            </motion.div>
            <motion.div
              className="relative h-[110px] w-[104px] overflow-hidden rounded-r-xl border border-ink/15 bg-paper shadow-soft sm:h-[140px] sm:w-[128px]"
              style={{ transformOrigin: "left center" }}
              initial={{ rotateY: -82 }}
              animate={{ rotateY: -18 }}
              transition={leafTransition}
            >
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-ink/10 to-transparent"
              />
              <span
                aria-hidden="true"
                className="absolute inset-y-3 left-3 w-px bg-ink/10 sm:left-4"
              />
            </motion.div>
            <div className="absolute bottom-0 left-1/2 h-[114px] w-[3px] -translate-x-1/2 rounded-full bg-pink-secondary sm:h-[144px]" />
          </div>
        </div>

        <div className="max-w-2xl">
          <motion.h1
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={textTransition(1.55)}
            className="font-display text-4xl leading-[1.05] text-ink sm:text-6xl"
          >
            Chapter <span className="text-pink-secondary">&amp;</span> Bloom
          </motion.h1>

          <motion.p
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={textTransition(1.75)}
            className="mt-4 font-display text-lg italic text-ink-70 sm:text-xl"
          >
            Made for Those Who Live Between the Pages.
          </motion.p>

          <motion.p
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={textTransition(1.95)}
            className="mx-auto mt-6 max-w-lg text-base text-ink-70 sm:text-lg"
          >
            Discover beautifully curated book bundles and thoughtful bookish gifts, created to make
            every reading moment feel a little more special.
          </motion.p>

          <motion.div
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={textTransition(2.15)}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <ButtonLink href="/shop" size="lg">
              Explore Book Bundles
            </ButtonLink>
            <ButtonLink href="/build-a-book" size="lg" variant="outline">
              Build A Book
            </ButtonLink>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
