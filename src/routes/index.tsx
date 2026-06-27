import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { HeroSlider } from "@/components/site/hero-slider";
import {
  CategoriesSection,
  FeaturedProducts,
  DealsBanner,
  NewArrivals,
  BestSellers,
  BrandsStrip,
  BlogSection,
  TestimonialsSection,
  FaqSection,
  NewsletterSection,
} from "@/components/site/sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "گل‌سا | فروشگاه آنلاین آرایشی و مراقبت از پوست" },
      { name: "description", content: "خرید آنلاین محصولات اصل آرایشی، مراقبت از پوست، عطر و اسپری از برندهای معتبر دنیا با تضمین اصالت و ارسال سراسری." },
      { property: "og:title", content: "گل‌سا | فروشگاه آنلاین آرایشی و مراقبت از پوست" },
      { property: "og:description", content: "محصولات اصل آرایشی و مراقبت از پوست از برندهای معتبر دنیا." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSlider />
        <CategoriesSection />
        <FeaturedProducts />
        <DealsBanner />
        <NewArrivals />
        <BestSellers />
        <BrandsStrip />
        <BlogSection />
        <TestimonialsSection />
        <FaqSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
