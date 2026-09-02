"use client";

import { motion } from "framer-motion";

/**
 * prefers-reduced-motion fallback: no cinematic sequence, just a brief fade
 * with the genre name — same functionality, none of the motion.
 */
export function ReducedMotionTransition({ label }: { label: string }) {
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-cream"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      role="presentation"
      aria-hidden="true"
    >
      <p className="font-display text-xl text-ink">{label}</p>
    </motion.div>
  );
}
