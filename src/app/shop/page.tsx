import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopPageClient } from "./ShopPageClient";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse every Chapter & Bloom book bundle, from Standard to Bulk Premium, or build your own with Build A Book.",
};

export default function ShopPage() {
  return (
    <Suspense fallback={null}>
      <ShopPageClient />
    </Suspense>
  );
}
