import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

export function PolicyShell({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="py-16 sm:py-20">
      <Container className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-50">{eyebrow}</p>
        <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">{title}</h1>
        <div className="mt-8 space-y-8 text-sm leading-relaxed text-ink-70 sm:text-base">{children}</div>
      </Container>
    </div>
  );
}
