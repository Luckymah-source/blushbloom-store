import { Link } from "@tanstack/react-router";
import { ChevronLeft, Star, Quote } from "lucide-react";
import { ProductCard } from "./product-card";
import { CATEGORIES, BRANDS, PRODUCTS, POSTS, TESTIMONIALS, FAQS, type Product } from "@/lib/mock-data";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchActiveProducts, dbToCardProduct } from "@/lib/products-api";

function useDBProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => fetchActiveProducts(),
    staleTime: 30_000,
  });
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-3xl border border-border bg-card p-3 animate-pulse">
          <div className="aspect-square rounded-2xl bg-rose-soft/40" />
          <div className="h-3 mt-3 rounded bg-rose-soft/60 w-1/3" />
          <div className="h-4 mt-2 rounded bg-rose-soft/60 w-3/4" />
          <div className="h-4 mt-3 rounded bg-rose-soft/60 w-1/2" />
        </div>
      ))}
    </div>
  );
}

export function SectionHeader({ eyebrow, title, href }: { eyebrow?: string; title: string; href?: string }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div className="min-w-0">
        {eyebrow && <div className="text-xs font-bold text-primary mb-1">{eyebrow}</div>}
        <h2 className="text-xl md:text-2xl font-black tracking-tight">{title}</h2>
      </div>
      {href && (
        <Link to={href} className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all">
          مشاهده همه <ChevronLeft className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

export function ProductGrid({ items }: { items: Product[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      {items.map((p) => (<ProductCard key={p.id} p={p} />))}
    </div>
  );
}

export function CategoriesSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 mt-14">
      <SectionHeader eyebrow="کاوش کنید" title="دسته‌بندی محصولات" />
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            to="/category/$slug"
            params={{ slug: c.slug }}
            className="group glass-pink flex flex-col items-center justify-center gap-2 rounded-3xl p-5 text-center transition hover:shadow-soft hover:-translate-y-1"
          >
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-2xl text-primary shadow-soft">{c.icon}</div>
            <span className="text-xs md:text-sm font-bold">{c.title}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function DealsBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 mt-14">
      <div className="relative overflow-hidden rounded-4xl gradient-rose p-8 md:p-12 text-foreground shadow-soft">
        <div className="absolute -top-20 -end-20 h-64 w-64 rounded-full bg-white/40 blur-3xl" />
        <div className="relative max-w-md">
          <span className="inline-block rounded-full bg-white/80 px-3 py-1 text-xs font-bold text-primary">تخفیف ویژه هفته</span>
          <h2 className="mt-4 text-2xl md:text-4xl font-black">تا ۵۰٪ تخفیف روی مراقبت از پوست</h2>
          <p className="mt-3 text-sm md:text-base text-foreground/80">جشنواره بهاره آشنا پرفیوم برای زیبایی همیشگی شما — فقط تا پایان هفته.</p>
          <Link to="/category/$slug" params={{ slug: "skincare" }} className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm font-bold hover:opacity-90 transition">
            مشاهده تخفیف‌ها <ChevronLeft className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function BrandsStrip() {
  return (
    <section className="mx-auto max-w-7xl px-4 mt-14">
      <SectionHeader title="برندهای معتبر" href="/brands" />
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {BRANDS.map((b) => (
          <Link key={b} to="/brands" className="glass flex h-20 items-center justify-center rounded-2xl text-sm font-bold hover:text-primary transition">
            {b}
          </Link>
        ))}
      </div>
    </section>
  );
}

export function BlogSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 mt-14">
      <SectionHeader eyebrow="مجله زیبایی" title="آخرین مقالات" href="/blog" />
      <div className="grid gap-4 md:grid-cols-3">
        {POSTS.map((p) => (
          <Link key={p.slug} to="/blog" className="group rounded-3xl border border-border bg-card p-5 transition hover:shadow-soft hover:-translate-y-1">
            <div className="aspect-[16/9] rounded-2xl gradient-rose mb-4" />
            <div className="text-xs text-muted-foreground">{p.date} • {p.readTime}</div>
            <h3 className="mt-2 text-base font-bold leading-relaxed group-hover:text-primary transition">{p.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 mt-14">
      <SectionHeader eyebrow="مشتریان ما" title="نظرات کسانی که خرید کرده‌اند" />
      <div className="grid gap-4 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <figure key={t.name} className="glass-pink rounded-3xl p-6">
            <Quote className="h-7 w-7 text-primary mb-3" />
            <blockquote className="text-sm leading-relaxed">{t.text}</blockquote>
            <figcaption className="mt-4 flex items-center justify-between">
              <span className="font-bold">{t.name}</span>
              <span className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="mx-auto max-w-3xl px-4 mt-14">
      <SectionHeader eyebrow="پاسخ به سوالات شما" title="سوالات متداول" />
      <div className="space-y-3">
        {FAQS.map((f, i) => (
          <div key={i} className="rounded-2xl border border-border bg-card overflow-hidden">
            <button
              type="button"
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between gap-3 px-5 py-4 text-start font-bold hover:bg-rose-soft/40 transition"
            >
              <span>{f.q}</span>
              <span className={`text-primary text-xl transition ${open === i ? "rotate-45" : ""}`}>+</span>
            </button>
            {open === i && (
              <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">{f.a}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export function NewsletterSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 mt-14">
      <div className="relative overflow-hidden rounded-4xl bg-foreground text-background p-8 md:p-12">
        <div className="absolute -bottom-20 -start-20 h-72 w-72 rounded-full bg-primary/40 blur-3xl" />
        <div className="relative grid gap-6 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-black">عضو خبرنامه آشنا پرفیوم شوید</h2>
            <p className="mt-2 text-sm text-background/80">از تخفیف‌ها، محصولات جدید و نکات زیبایی باخبر شوید.</p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-2 bg-white/10 backdrop-blur p-2 rounded-full"
          >
            <input
              type="email"
              required
              placeholder="ایمیل شما"
              className="flex-1 bg-transparent placeholder:text-background/60 outline-none px-4 py-3 text-sm"
            />
            <button type="submit" className="rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:opacity-90 transition">
              عضویت
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export function FeaturedProducts() {
  const { data, isLoading } = useDBProducts();
  const items = (data ?? []).map(dbToCardProduct);
  return (
    <section className="mx-auto max-w-7xl px-4 mt-14">
      <SectionHeader eyebrow="منتخب آشنا پرفیوم" title="محصولات ویژه" href="/category/skincare" />
      {isLoading ? <ProductGridSkeleton /> : <ProductGrid items={items.slice(0, 4)} />}
    </section>
  );
}

export function NewArrivals() {
  const { data, isLoading } = useDBProducts();
  const items = (data ?? []).map(dbToCardProduct);
  return (
    <section className="mx-auto max-w-7xl px-4 mt-14">
      <SectionHeader eyebrow="تازه رسیده‌ها" title="جدیدترین محصولات" href="/category/makeup" />
      {isLoading ? <ProductGridSkeleton /> : <ProductGrid items={items.slice(0, 4)} />}
    </section>
  );
}

export function BestSellers() {
  const { data, isLoading } = useDBProducts();
  const items = (data ?? []).map(dbToCardProduct);
  return (
    <section className="mx-auto max-w-7xl px-4 mt-14">
      <SectionHeader eyebrow="پرفروش‌ترین‌ها" title="انتخاب مشتریان" href="/category/perfume" />
      {isLoading ? <ProductGridSkeleton /> : <ProductGrid items={items.slice(0, 4)} />}
    </section>
  );
}