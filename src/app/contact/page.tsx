import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Chapter & Bloom.",
};

export default function ContactPage() {
  return (
    <div className="py-16 sm:py-20">
      <Container className="max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-50">Contact</p>
        <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">Get in touch</h1>
        <p className="mt-4 text-base text-ink-70">
          Email us any time at{" "}
          <a
            href="mailto:chapterandbloom@outlook.com"
            className="text-ink underline decoration-pink-secondary decoration-2 underline-offset-4"
          >
            chapterandbloom@outlook.com
          </a>{" "}
          or use the form below.
        </p>

        <div className="mt-10">
          <ContactForm />
        </div>
      </Container>
    </div>
  );
}
