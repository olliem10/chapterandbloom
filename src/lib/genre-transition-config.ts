export interface GenreTransitionTiming {
  /** Total time the overlay stays mounted, including its own fade out. */
  durationMs: number;
  /** When (relative to mount) navigation actually happens, so the destination is ready before the overlay clears. */
  navigateAtMs: number;
}

/**
 * Per-genre cinematic transition timings for the "Browse by Genre" section.
 * Keep each entry within the brief's 1–2s target. Reduced-motion users get a
 * short generic fade instead (see ReducedMotionTransition).
 */
export const GENRE_TRANSITION_CONFIG: Record<string, GenreTransitionTiming> = {
  romance: { durationMs: 1300, navigateAtMs: 950 },
  thriller: { durationMs: 1800, navigateAtMs: 1350 },
  horror: { durationMs: 1800, navigateAtMs: 1350 },
  adventure: { durationMs: 1300, navigateAtMs: 950 },
  fantasy: { durationMs: 1500, navigateAtMs: 1100 },
  "science-fiction": { durationMs: 1300, navigateAtMs: 950 },
  childrens: { durationMs: 1300, navigateAtMs: 950 },
};

export const DEFAULT_TRANSITION: GenreTransitionTiming = { durationMs: 1200, navigateAtMs: 850 };

export const REDUCED_MOTION_TRANSITION: GenreTransitionTiming = { durationMs: 220, navigateAtMs: 120 };
