import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";

const SHOP_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/build-a-book", label: "Build A Book" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const POLICY_LINKS = [
  { href: "/shipping", label: "Shipping" },
  { href: "/returns", label: "Returns & Refunds" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-paper">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-ink-70">Made for Those Who Live Between the Pages.</p>
          <a
            href="mailto:chapterandbloom@outlook.com"
            className="mt-4 inline-block text-sm text-ink underline decoration-pink-secondary decoration-2 underline-offset-4 hover:text-ink/70"
          >
            chapterandbloom@outlook.com
          </a>
        </div>

        <nav aria-label="Shop">
          <h3 className="text-sm font-semibold text-ink">Shop</h3>
          <ul className="mt-4 space-y-3">
            {SHOP_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-ink-70 hover:text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Policies">
          <h3 className="text-sm font-semibold text-ink">Policies</h3>
          <ul className="mt-4 space-y-3">
            {POLICY_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-ink-70 hover:text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-semibold text-ink">Stay Between the Pages</h3>
          <p className="mt-4 text-sm text-ink-70">
            Join the newsletter on our homepage for new bundles and bookish updates.
          </p>
        </div>
      </Container>

      <div className="border-t border-border py-6">
        <Container className="flex flex-col gap-2 text-xs text-ink-50 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Chapter &amp; Bloom. All rights reserved.</p>
          <p>Shipping within the UK in 2&ndash;3 working days.</p>
        </Container>
      </div>
    </footer>
  );
}
