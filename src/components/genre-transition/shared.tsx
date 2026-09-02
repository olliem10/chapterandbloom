"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * Shared shell every genre transition renders into. Provides the fixed
 * full-viewport backdrop, mount/exit fade, and the "Entering X" label that
 * ties all seven transitions back to one Chapter & Bloom visual language.
 */
export function TransitionFrame({
  background,
  label,
  labelClassName,
  children,
}: {
  background: string;
  label: string;
  labelClassName?: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      className={cn("fixed inset-0 z-[200] flex items-center justify-center overflow-hidden", background)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      role="presentation"
      aria-hidden="true"
    >
      {children}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.5, ease: "easeOut" }}
        className={cn(
          "absolute bottom-[16%] left-1/2 -translate-x-1/2 whitespace-nowrap px-4 text-center font-display text-2xl italic sm:text-3xl",
          labelClassName ?? "text-paper",
        )}
      >
        {label}
      </motion.p>
    </motion.div>
  );
}

/**
 * A small version of the homepage hero's book motif, reused across most
 * transitions as connective tissue — the shared "signature" that keeps all
 * seven feeling like one brand rather than seven different sites.
 */
export function MiniBook({
  tint = "bg-paper",
  openAngle = 20,
  size = "small",
  spineColor = "bg-pink-secondary",
  flutter = false,
}: {
  tint?: string;
  openAngle?: number;
  size?: "small" | "medium";
  spineColor?: string;
  flutter?: boolean;
}) {
  const dims =
    size === "medium"
      ? "h-[130px] w-[120px] sm:h-[160px] sm:w-[150px]"
      : "h-[100px] w-[92px] sm:h-[120px] sm:w-[110px]";

  const leafTransition = flutter
    ? { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const, times: [0, 0.3, 0.55, 1], }
    : { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <div className="relative flex items-end" style={{ perspective: 700 }} aria-hidden="true">
      <motion.div
        className={cn("relative overflow-hidden rounded-l-xl border border-white/10 shadow-lift", dims, tint)}
        style={{ transformOrigin: "right center" }}
        initial={{ rotateY: 82 }}
        animate={flutter ? { rotateY: [82, 4, 34, openAngle] } : { rotateY: openAngle }}
        transition={leafTransition}
      />
      <motion.div
        className={cn("relative overflow-hidden rounded-r-xl border border-white/10 shadow-lift", dims, tint)}
        style={{ transformOrigin: "left center" }}
        initial={{ rotateY: -82 }}
        animate={flutter ? { rotateY: [-82, -4, -34, -openAngle] } : { rotateY: -openAngle }}
        transition={leafTransition}
      />
      <div
        className={cn("absolute bottom-0 left-1/2 h-full w-[3px] -translate-x-1/2 rounded-full", spineColor)}
      />
    </div>
  );
}

export function Petal({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size * 1.2}
      viewBox="0 0 20 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M10 0C10 0 20 8 20 15C20 20 15.5 24 10 24C4.5 24 0 20 0 15C0 8 10 0 10 0Z"
        className="fill-pink-secondary"
      />
    </svg>
  );
}
