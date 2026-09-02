"use client";

import { GENRES } from "@/lib/genres";
import type { Genre } from "@/lib/types";
import { cn } from "@/lib/utils";

export function GenreSelect({
  value,
  onChange,
  invalid,
}: {
  value: Genre | null;
  onChange: (genre: Genre) => void;
  invalid?: boolean;
}) {
  return (
    <div>
      <div role="radiogroup" aria-label="Choose a genre" aria-invalid={invalid} className="flex flex-wrap gap-2">
        {GENRES.map((g) => (
          <button
            key={g.slug}
            type="button"
            role="radio"
            aria-checked={value === g.name}
            onClick={() => onChange(g.name)}
            className={cn(
              "cursor-pointer rounded-full border px-3.5 py-2 text-sm font-medium transition-colors",
              value === g.name
                ? "border-ink bg-ink text-paper"
                : invalid
                  ? "border-error text-ink-70"
                  : "border-border-strong text-ink-70 hover:border-ink hover:text-ink",
            )}
          >
            {g.name}
          </button>
        ))}
      </div>
      {invalid ? (
        <p role="alert" className="mt-2 text-sm text-error">
          Please choose a genre before adding to cart.
        </p>
      ) : null}
    </div>
  );
}
