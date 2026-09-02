"use client";

import { motion } from "framer-motion";
import { MiniBook, TransitionFrame } from "./shared";

const PARTICLES = [
  { x: -60, delay: 0.5, size: 5 },
  { x: 40, delay: 0.6, size: 4 },
  { x: -20, delay: 0.7, size: 6 },
  { x: 80, delay: 0.55, size: 3 },
  { x: -90, delay: 0.75, size: 4 },
  { x: 10, delay: 0.85, size: 5 },
];

/** The book opens, soft light and glowing particles rise, an enchanted glow suggests a forest beyond. */
export function FantasyTransition({ label }: { label: string }) {
  return (
    <TransitionFrame
      background="bg-[radial-gradient(ellipse_at_center,_#2b1a3d_0%,_#140b1f_70%)]"
      label={label}
      labelClassName="text-paper"
    >
      <motion.div
        aria-hidden="true"
        className="absolute bottom-0 h-40 w-[70%] rounded-t-[100%] bg-pink-secondary/10 blur-2xl"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
      />

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}>
        <MiniBook tint="bg-paper/95" openAngle={22} spineColor="bg-pink-secondary" />
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute h-40 w-40 rounded-full bg-pink-secondary/50 blur-2xl"
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: [0, 0.8, 0.5], scale: 1.4 }}
        transition={{ duration: 0.9, delay: 0.25, ease: "easeOut" }}
      />

      {PARTICLES.map((p, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="absolute rounded-full bg-pink-secondary shadow-[0_0_8px_2px_rgba(243,197,216,0.8)]"
          style={{ width: p.size, height: p.size, left: `calc(50% + ${p.x}px)`, bottom: "38%" }}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 1, 0], y: -90 }}
          transition={{ duration: 0.9, delay: p.delay, ease: "easeOut" }}
        />
      ))}
    </TransitionFrame>
  );
}
