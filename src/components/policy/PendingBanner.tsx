import type { ReactNode } from "react";

export function PendingBanner({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-card border border-pink-secondary bg-pink-primary/20 p-5 text-sm text-ink">
      {children}
    </div>
  );
}
