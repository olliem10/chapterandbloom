import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Temporary typographic wordmark — no real Chapter & Bloom logo file exists yet.
 * Swap for a real logo asset without touching layout once one is supplied.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Chapter & Bloom — home"
      className={cn("group inline-flex items-center font-display", className)}
    >
      <span className="text-xl leading-none tracking-tight sm:text-2xl">
        Chapter{" "}
        <span
          aria-hidden="true"
          className="text-pink-secondary transition-colors group-hover:text-ink"
        >
          &amp;
        </span>{" "}
        Bloom
      </span>
    </Link>
  );
}
