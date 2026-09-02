"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import type { GenreInfo } from "@/lib/genres";
import { GenreTransitionOverlay } from "./GenreTransitionOverlay";

interface GenreTransitionContextValue {
  /** Starts the cinematic overlay for a genre, then navigates to `href` once it's ready. */
  startTransition: (genre: GenreInfo, href: string) => void;
}

const GenreTransitionContext = createContext<GenreTransitionContextValue | null>(null);

export function GenreTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [active, setActive] = useState<{ genre: GenreInfo; href: string } | null>(null);

  const startTransition = useCallback((genre: GenreInfo, href: string) => {
    setActive({ genre, href });
  }, []);

  const handleNavigate = useCallback(
    (href: string) => {
      router.push(href);
    },
    [router],
  );

  const handleFinished = useCallback(() => {
    setActive(null);
  }, []);

  return (
    <GenreTransitionContext.Provider value={{ startTransition }}>
      {children}
      <AnimatePresence>
        {active ? (
          <GenreTransitionOverlay
            key={active.genre.slug}
            genre={active.genre}
            href={active.href}
            onNavigate={handleNavigate}
            onFinished={handleFinished}
          />
        ) : null}
      </AnimatePresence>
    </GenreTransitionContext.Provider>
  );
}

export function useGenreTransition() {
  const ctx = useContext(GenreTransitionContext);
  if (!ctx) throw new Error("useGenreTransition must be used within a GenreTransitionProvider");
  return ctx;
}
