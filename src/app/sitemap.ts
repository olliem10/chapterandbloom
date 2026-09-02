import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/products";

const BASE_URL = "https://chapterandbloom.co.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/shop",
    "/build-a-book",
    "/about",
    "/faq",
    "/contact",
    "/cart",
    "/shipping",
    "/returns",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
  }));

  const productRoutes = PRODUCTS.map((p) => ({
    url: `${BASE_URL}/shop/${p.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...productRoutes];
}
