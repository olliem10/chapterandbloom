import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PRODUCTS, getProductBySlug, getRelatedProducts } from "@/lib/products";
import { ProductDetailClient } from "./ProductDetailClient";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/shop/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} — Chapter & Bloom`,
      description: product.description,
    },
  };
}

export default async function ProductPage(props: PageProps<"/shop/[slug]">) {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const related = getRelatedProducts(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    offers: {
      "@type": "Offer",
      priceCurrency: "GBP",
      price: product.priceGBP.toFixed(2),
      url: product.stripeLink ?? `https://chapterandbloom.co.uk/shop/${product.slug}`,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Suspense fallback={null}>
        <ProductDetailClient product={product} related={related} />
      </Suspense>
    </>
  );
}
