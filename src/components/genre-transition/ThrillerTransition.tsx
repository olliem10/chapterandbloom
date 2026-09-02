"use client";

import { motion } from "framer-motion";
import { MiniBook, TransitionFrame } from "./shared";

const FRAMES = [
  { delay: 0.05, scaleFrom: 0.3, scaleTo: 1.6, size: 120 },
  { delay: 0.15, scaleFrom: 0.25, scaleTo: 1.3, size: 220 },
  { delay: 0.25, scaleFrom: 0.2, scaleTo: 1.0, size: 340 },
];

/** Flickering lamp light, a forward rush through dark door-frames, rapid pages, a brief blackout. */
export function ThrillerTransition({ label }: { label: string }) {
  return (
    <TransitionFrame background="bg-ink" label={label} labelClassName="text-paper">
      {FRAMES.map((f, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          className="absolute rounded-2xl border border-amber-200/10"
          style={{ width: f.size, height: f.size * 1.3 }}
          initial={{ opacity: 0, scale: f.scaleFrom }}
          animate={{ opacity: [0, 0.5, 0], scale: f.scaleTo }}
          transition={{ duration: 0.9, delay: f.delay, ease: "easeIn" }}
        />
      ))}

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-full w-24 -translate-x-1/2 bg-gradient-to-b from-amber-300/25 via-amber-200/10 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.9, 0.15, 0.8, 0.2, 0.6] }}
        transition={{ duration: 0.6, delay: 0.1, times: [0, 0.15, 0.3, 0.5, 0.7, 1] }}
      />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55, duration: 0.3 }}>
        <MiniBook tint="bg-paper/95" openAngle={16} spineColor="bg-amber-300/60" flutter />
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1, 0] }}
        transition={{ duration: 0.5, delay: 1.15, times: [0, 0.5, 0.75, 1] }}
      />
    </TransitionFrame>
  );
}
