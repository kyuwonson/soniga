import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductCards from "@/components/ProductCards";

export default function Home() {
  return (
    <main className="min-h-screen bg-ivory">
      <Header />
      <HeroSection />
      <ProductCards />
    </main>
  );
}
