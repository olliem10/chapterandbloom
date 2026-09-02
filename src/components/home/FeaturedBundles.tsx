import { getFeaturedProducts } from "@/lib/products";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/shop/ProductCard";
import { ButtonLink } from "@/components/ui/Button";

export function FeaturedBundles() {
  const products = getFeaturedProducts();

  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Featured Bundles"
            title="Start with one of our favourites"
            description="A curated starting point — every bundle scales up with a few more thoughtful extras."
          />
          <ButtonLink href="/shop" variant="outline" className="shrink-0">
            View all bundles
          </ButtonLink>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
