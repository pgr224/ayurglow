import { HeroCarousel } from "@/components/home/HeroCarousel";
import { getBannersAction } from "@/app/admin/actions";

import { TrustBanner } from "@/components/home/TrustBanner";
import { BestsellerGrid } from "@/components/home/BestsellerGrid";
import { ShopByConcern } from "@/components/home/ShopByConcern";
import { RoutineGrid } from "@/components/home/RoutineGrid";
import { BrandStory } from "@/components/home/BrandStory";
import { IngredientsShowcase } from "@/components/home/IngredientsShowcase";
import { Testimonials } from "@/components/home/Testimonials";

export default async function Home() {
  const banners = await getBannersAction();

  return (
    <div className="flex flex-col">
      <HeroCarousel initialBanners={banners} />
      <TrustBanner />
      <BestsellerGrid />
      <ShopByConcern />
      <RoutineGrid />
      <BrandStory />
      <IngredientsShowcase />
      <Testimonials />
      <div className="h-12 md:hidden" />
    </div>
  );
}
