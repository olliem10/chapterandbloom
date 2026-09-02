"use client";

import { useState, type FormEvent } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "info">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
      setStatus("error");
      return;
    }
    setStatus("info");
  }

  return (
    <section className="py-20 sm:py-24">
      <Container className="rounded-card border border-border bg-pink-primary/30 px-8 py-14 text-center sm:px-16">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-70">Newsletter</p>
        <h2 className="mx-auto mt-4 max-w-md font-display text-3xl text-ink sm:text-4xl">
          Stay Between the Pages
        </h2>
        <p className="mx-auto mt-4 max-w-sm text-sm text-ink-70">
          New bundles, genre spotlights and the occasional bookish thought — no spam, just Chapter &amp;
          Bloom.
        </p>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="mx-auto mt-8 flex max-w-sm flex-col gap-3 sm:flex-row"
        >
          <div className="flex-1 text-left">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setStatus("idle");
              }}
              placeholder="you@example.com"
              aria-invalid={status === "error"}
              aria-describedby={status !== "idle" ? "newsletter-status" : undefined}
              className="h-12 w-full rounded-control border border-border-strong bg-paper px-4 text-sm text-ink placeholder:text-ink-50 focus-visible:border-ink"
            />
          </div>
          <Button type="submit" size="lg">
            Join the list
          </Button>
        </form>

        <p
          id="newsletter-status"
          role="status"
          aria-live="polite"
          className={`mt-3 text-sm ${status === "error" ? "text-error" : "text-ink-70"}`}
        >
          {status === "error" && "Please enter a valid email address."}
          {status === "info" &&
            "Thanks! Our newsletter isn't fully connected yet — email us and we'll add you by hand in the meantime."}
        </p>
      </Container>
    </section>
  );
}
