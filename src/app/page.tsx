
import { menuItems } from '@/data/menuData';
import HeroSection from "@/components/sections/Hero";
import FeaturedMenu from "@/components/sections/FeaturedMenu";
import AboutPreview from "@/components/sections/HomePreview";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  const featuredItems = menuItems.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      
      <HeroSection />
      {/* Featured Menu Section */}
      
      <FeaturedMenu />

      {/* About Preview Section */}
        <AboutPreview />
      {/* CTA Section */}
        <CTASection />
    </div>
  );
}