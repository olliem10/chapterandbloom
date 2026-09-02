import { Hero } from "@/components/home/Hero";
import { FeaturedBundles } from "@/components/home/FeaturedBundles";
import { ShopByGenre } from "@/components/home/ShopByGenre";
import { WhyUs } from "@/components/home/WhyUs";
import { HowItWorks } from "@/components/home/HowItWorks";
import { BuildABookTeaser } from "@/components/home/BuildABookTeaser";
import { GiftExperience } from "@/components/home/GiftExperience";
import { Reviews } from "@/components/home/Reviews";
import { FaqPreview } from "@/components/home/FaqPreview";
import { Newsletter } from "@/components/home/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedBundles />
      <ShopByGenre />
      <WhyUs />
      <HowItWorks />
      <BuildABookTeaser />
      <GiftExperience />
      <Reviews />
      <FaqPreview />
      <Newsletter />
    </>
  );
}
