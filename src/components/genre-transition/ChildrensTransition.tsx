"use client";

import { motion } from "framer-motion";
import { MiniBook, TransitionFrame } from "./shared";

const SHAPES = [
  { type: "cloud", x: -110, y: -70, delay: 0.25 },
  { type: "star", x: 100, y: -50, delay: 0.35 },
  { type: "star", x: -60, y: 70, delay: 0.5 },
  { type: "cloud", x: 90, y: 60, delay: 0.42 },
] as const;

function Cloud() {
  return (
    <svg width="40" height="24" viewBox="0 0 40 24" fill="none" aria-hidden="true">
      <path
        d="M8 20C3.6 20 0 16.4 0 12C0 7.9 3.2 4.5 7.2 4.1C8.6 1.7 11.1 0 14 0C17.6 0 20.6 2.4 21.7 5.7C22.3 5.5 22.9 5.4 23.6 5.4C27.1 5.4 30 8.3 30 11.8C30 12.2 30 12.6 29.9 13C31.7 13.7 33 15.4 33 17.4C33 20 30.9 22 28.4 22H8.4C8.3 22 8.1 20 8 20Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function Star() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 0L14.6 8.4L23 12L14.6 15.6L12 24L9.4 15.6L1 12L9.4 8.4L12 0Z" className="fill-pink-secondary" />
    </svg>
  );
}

/** Hand-drawn clouds and stars pop out around the book, brighter and more playful than the rest of the site. */
export function ChildrensTransition({ label }: { label: string }) {
  return (
    <TransitionFrame
      background="bg-gradient-to-b from-pink-primary via-cream to-pink-primary/60"
      label={label}
      labelClassName="text-ink"
    >
      {SHAPES.map((s, i) => (
        <motion.span
          key={i}
          className="absolute left-1/2 top-1/2"
          style={{ marginLeft: s.x, marginTop: s.y }}
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 14, delay: s.delay }}
        >
          {s.type === "cloud" ? <Cloud /> : <Star />}
        </motion.span>
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.05 }}
      >
        <MiniBook tint="bg-paper" openAngle={24} spineColor="bg-pink-secondary" />
      </motion.div>
    </TransitionFrame>
  );
}
