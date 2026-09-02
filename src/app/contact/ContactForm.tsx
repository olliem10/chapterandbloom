"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface FormState {
  name: string;
  email: string;
  orderNumber: string;
  subject: string;
  message: string;
}

const EMPTY: FormState = { name: "", email: "", orderNumber: "", subject: "", message: "" };

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>("idle");

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Please enter a valid email address.";
    if (!form.subject.trim()) next.subject = "Please enter a subject.";
    if (!form.message.trim()) next.message = "Please enter a message.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setForm(EMPTY);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-card border border-pink-secondary bg-pink-primary/25 p-6 text-sm text-ink"
      >
        <p className="font-semibold">Thanks &mdash; we&rsquo;ve received your message.</p>
        <p className="mt-1 text-ink-70">
          Our contact form isn&rsquo;t fully connected to email delivery yet. If this is urgent, please
          email us directly at{" "}
          <a
            href="mailto:chapterandbloom@outlook.com"
            className="underline decoration-2 underline-offset-4"
          >
            chapterandbloom@outlook.com
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <Field label="Name" id="name" required error={errors.name}>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={inputClass(!!errors.name)}
        />
      </Field>

      <Field label="Email" id="email" required error={errors.email}>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={inputClass(!!errors.email)}
        />
      </Field>

      <Field label="Order number" id="orderNumber" hint="Optional">
        <input
          id="orderNumber"
          name="orderNumber"
          type="text"
          value={form.orderNumber}
          onChange={(e) => setForm((f) => ({ ...f, orderNumber: e.target.value }))}
          className={inputClass(false)}
        />
      </Field>

      <Field label="Subject" id="subject" required error={errors.subject}>
        <input
          id="subject"
          name="subject"
          type="text"
          value={form.subject}
          onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          className={inputClass(!!errors.subject)}
        />
      </Field>

      <Field label="Message" id="message" required error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={inputClass(!!errors.message)}
        />
      </Field>

      {status === "error" ? (
        <p role="alert" className="text-sm text-error">
          Something went wrong sending your message. Please try again, or email us directly.
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}

function inputClass(invalid: boolean) {
  return cn(
    "mt-2 w-full rounded-control border bg-paper p-3 text-sm text-ink focus-visible:border-ink",
    invalid ? "border-error" : "border-border-strong",
  );
}

function Field({
  label,
  id,
  required,
  hint,
  error,
  children,
}: {
  label: string;
  id: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}{" "}
        {required ? (
          <span aria-hidden="true" className="text-error">
            *
          </span>
        ) : null}
        {hint ? <span className="font-normal text-ink-50"> ({hint})</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
