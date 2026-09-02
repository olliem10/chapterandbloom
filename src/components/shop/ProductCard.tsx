import Link from "next/link";
import { BookOpen } from "lucide-react";
import type { Product } from "@/lib/types";
import { cn, formatGBP } from "@/lib/utils";

export function ProductCard({
  product,
  className,
  genreSlug,
}: {
  product: Product;
  className?: string;
  genreSlug?: string;
}) {
  const href = genreSlug ? `/shop/${product.slug}?genre=${genreSlug}` : `/shop/${product.slug}`;

  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col overflow-hidden rounded-card border border-border bg-paper shadow-soft transition-shadow hover:shadow-lift",
        className,
      )}
    >
      <div className="relative flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-pink-primary/50 via-cream to-paper">
        <BookOpen className="h-14 w-14 text-ink/25" strokeWidth={1.25} aria-hidden="true" />
        {product.bulk ? (
          <span className="absolute left-4 top-4 rounded-full bg-ink px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-paper">
            Bulk
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl text-ink">{product.name}</h3>
          <p className="whitespace-nowrap font-display text-xl tabular-nums text-ink">
            {formatGBP(product.priceGBP)}
          </p>
        </div>
        <p className="text-sm text-ink-70">{product.tagline}</p>
        <ul className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-ink-50">
          {product.includedItems.map((item) => (
            <li key={item} className="before:mr-1 before:content-['•']">
              {item}
            </li>
          ))}
        </ul>
        <span className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-medium text-ink underline decoration-pink-secondary decoration-2 underline-offset-4 group-hover:decoration-ink">
          View Bundle
        </span>
      </div>
    </Link>
  );
}
