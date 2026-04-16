import { HeroCarousel } from "@/components/home/HeroCarousel";
import { CategoryCircles } from "@/components/home/CategoryCircles";
import { RoutineGrid } from "@/components/home/RoutineGrid";
import { BestsellerGrid } from "@/components/home/BestsellerGrid";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* 1. Hero Carousel */}
      <HeroCarousel />

      {/* 2. Shop by Concern / Skin Type */}
      <CategoryCircles title="Shop by Concern" />
      
      {/* 3. Bestseller Section */}
      <BestsellerGrid />

      {/* 4. Routine Section */}
      <RoutineGrid />

      {/* 5. Shop by Ingredient */}
      <CategoryCircles title="Shop by Ingredient" />

      {/* Extra spacing for bottom nav on mobile */}
      <div className="h-12" />
    </div>
  );
}
