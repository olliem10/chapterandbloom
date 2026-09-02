"use client";

import { motion } from "framer-motion";
import { MiniBook, TransitionFrame } from "./shared";

const STARS = Array.from({ length: 10 }, (_, i) => ({
  x: (i * 37) % 100,
  y: (i * 53) % 100,
  delay: 0.3 + (i % 5) * 0.08,
  size: i % 3 === 0 ? 2.5 : 1.5,
}));

/** The page resolves into a minimal interface, stars emerge, a digital wipe carries the transition through. */
export function ScienceFictionTransition({ label }: { label: string }) {
  return (
    <TransitionFrame background="bg-[#05070d]" label={label} labelClassName="text-paper">
      {STARS.map((s, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="absolute rounded-full bg-white"
          style={{ width: s.size, height: s.size, left: `${s.x}%`, top: `${s.y}%` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.6] }}
          transition={{ duration: 0.5, delay: s.delay }}
        />
      ))}

      <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <motion.div
          className="h-px w-[70%] bg-gradient-to-r from-transparent via-sky-200/40 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <motion.div
          className="h-16 w-px bg-gradient-to-b from-transparent via-sky-200/30 to-transparent"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.25 }}
        />
      </div>

      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.05, duration: 0.4 }}>
        <MiniBook tint="bg-paper/90" openAngle={16} spineColor="bg-sky-300/60" />
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-transparent via-sky-200/70 to-transparent"
        initial={{ x: "-200%" }}
        animate={{ x: "900%" }}
        transition={{ duration: 0.6, delay: 0.65, ease: "easeInOut" }}
      />
    </TransitionFrame>
  );
}
