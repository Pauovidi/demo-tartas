import { HeroSection } from "@/src/components/home/hero-section"
import { ManifestoSection } from "@/src/components/home/manifesto-section"
import { FeaturedProducts } from "@/src/components/home/featured-products"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ManifestoSection />
      <FeaturedProducts />
    </>
  )
}
