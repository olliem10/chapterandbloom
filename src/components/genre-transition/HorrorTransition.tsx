"use client";

import { motion } from "framer-motion";
import { MiniBook, TransitionFrame } from "./shared";

const SHELF_BOOKS = [
  { x: -3, w: 22, h: 92, delay: 0 },
  { x: 3, w: 18, h: 100, delay: 0.02 },
  { x: -2, w: 26, h: 84, delay: 0.04 },
  { x: 3, w: 20, h: 96, delay: 0.03 },
  { x: -3, w: 24, h: 88, delay: 0.05 },
  { x: 2, w: 18, h: 100, delay: 0.01 },
];

/** A bookshelf silhouette shifts, a book opens by itself, a shadow passes over the page. */
export function HorrorTransition({ label }: { label: string }) {
  return (
    <TransitionFrame background="bg-black" label={label} labelClassName="text-paper">
      <div className="absolute bottom-[38%] left-1/2 flex -translate-x-1/2 items-end gap-[2px]" aria-hidden="true">
        {SHELF_BOOKS.map((b, i) => (
          <motion.div
            key={i}
            className="rounded-t-sm bg-white/[0.06]"
            style={{ width: b.w, height: b.h }}
            initial={{ x: 0 }}
            animate={{ x: [0, b.x, 0] }}
            transition={{ duration: 1.1, delay: b.delay, ease: "easeInOut" }}
          />
        ))}
      </div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-black/70 to-transparent"
        initial={{ x: "-120%" }}
        animate={{ x: "220%" }}
        transition={{ duration: 0.9, delay: 0.5, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
      >
        <MiniBook tint="bg-white/90" openAngle={14} spineColor="bg-white/20" />
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0.95, 0] }}
        transition={{ duration: 0.55, delay: 1.1, times: [0, 0.4, 0.65, 1] }}
      />
    </TransitionFrame>
  );
}
