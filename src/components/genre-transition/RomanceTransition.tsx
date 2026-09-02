"use client";

import { motion } from "framer-motion";
import { MiniBook, Petal, TransitionFrame } from "./shared";

const PETALS = [
  { x: -130, y: -20, delay: 0.15, size: 18, rotate: -15, duration: 1.0 },
  { x: 120, y: 10, delay: 0.3, size: 14, rotate: 20, duration: 1.1 },
  { x: -70, y: 60, delay: 0.45, size: 12, rotate: 8, duration: 1.0 },
  { x: 90, y: -50, delay: 0.2, size: 16, rotate: -10, duration: 1.05 },
  { x: 10, y: 90, delay: 0.55, size: 10, rotate: 25, duration: 0.95 },
];

/** Rose petals drift, warm blush light passes through, pages turn gently. */
export function RomanceTransition({ label }: { label: string }) {
  return (
    <TransitionFrame
      background="bg-gradient-to-b from-pink-primary via-pink-secondary/70 to-cream"
      label={label}
      labelClassName="text-ink"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-paper/40 blur-3xl"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      />

      {PETALS.map((p, i) => (
        <motion.span
          key={i}
          className="absolute left-1/2 top-1/2"
          initial={{ opacity: 0, x: p.x * -0.6, y: p.y * -0.6, rotate: 0 }}
          animate={{ opacity: [0, 0.9, 0.7], x: p.x, y: p.y, rotate: p.rotate }}
          transition={{ duration: p.duration, delay: p.delay, ease: "easeOut" }}
        >
          <Petal size={p.size} />
        </motion.span>
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <MiniBook tint="bg-paper" openAngle={18} spineColor="bg-ink/30" />
      </motion.div>
    </TransitionFrame>
  );
}
