"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import type { GenreInfo } from "@/lib/genres";
import { useGenreTransition } from "./GenreTransitionProvider";

/**
 * The homepage "Browse by Genre" card. Renders as a real link (keyboard
 * activation, middle-click, cmd/ctrl-click all behave normally) but a plain
 * left-click triggers the cinematic transition before navigating.
 */
export function GenreCard({ genre }: { genre: GenreInfo }) {
  const { startTransition } = useGenreTransition();
  const href = `/shop?genre=${genre.slug}`;

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    const isModifiedClick = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0;
    if (isModifiedClick) return;
    e.preventDefault();
    startTransition(genre, href);
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className="group flex h-full flex-col justify-between gap-6 rounded-card border border-border bg-cream p-5 transition-colors hover:border-pink-secondary hover:bg-pink-primary/25"
    >
      <span className="font-display text-lg text-ink">{genre.name}</span>
      <span className="text-xs text-ink-50">{genre.blurb}</span>
    </Link>
  );
}
