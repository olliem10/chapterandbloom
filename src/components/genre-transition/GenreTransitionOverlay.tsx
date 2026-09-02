"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import type { ComponentType } from "react";
import type { GenreInfo } from "@/lib/genres";
import { DEFAULT_TRANSITION, GENRE_TRANSITION_CONFIG, REDUCED_MOTION_TRANSITION } from "@/lib/genre-transition-config";
import { ReducedMotionTransition } from "./ReducedMotionTransition";
import { RomanceTransition } from "./RomanceTransition";
import { ThrillerTransition } from "./ThrillerTransition";
import { HorrorTransition } from "./HorrorTransition";
import { AdventureTransition } from "./AdventureTransition";
import { FantasyTransition } from "./FantasyTransition";
import { ScienceFictionTransition } from "./ScienceFictionTransition";
import { ChildrensTransition } from "./ChildrensTransition";

const TRANSITIONS: Record<string, ComponentType<{ label: string }>> = {
  romance: RomanceTransition,
  thriller: ThrillerTransition,
  horror: HorrorTransition,
  adventure: AdventureTransition,
  fantasy: FantasyTransition,
  "science-fiction": ScienceFictionTransition,
  childrens: ChildrensTransition,
};

export function GenreTransitionOverlay({
  genre,
  href,
  onNavigate,
  onFinished,
}: {
  genre: GenreInfo;
  href: string;
  onNavigate: (href: string) => void;
  onFinished: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const navigatedRef = useRef(false);

  const timing = reduceMotion ? REDUCED_MOTION_TRANSITION : (GENRE_TRANSITION_CONFIG[genre.slug] ?? DEFAULT_TRANSITION);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const navTimer = window.setTimeout(() => {
      if (!navigatedRef.current) {
        navigatedRef.current = true;
        onNavigate(href);
      }
    }, timing.navigateAtMs);

    const finishTimer = window.setTimeout(() => {
      onFinished();
    }, timing.durationMs);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(navTimer);
      window.clearTimeout(finishTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genre.slug]);

  const label = `Entering ${genre.name}`;

  if (reduceMotion) {
    return <ReducedMotionTransition label={label} />;
  }

  const Transition = TRANSITIONS[genre.slug] ?? ReducedMotionTransition;
  return <Transition label={label} />;
}
