import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  Check, ChevronLeft, Heart, Minus, Plus, ShieldCheck, ShoppingBag,
  Sparkles, Star, Truck, Undo2,
} from "lucide-react";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { ProductGallery } from "@/components/site/product-gallery";
import { ReviewForm } from "@/components/site/review-form";
import { ProductCard } from "@/components/site/product-card";
import { PRODUCTS, formatToman, getProductDetail, type Product, type ProductDetail } from "@/lib/mock-data";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = PRODUCTS.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product, detail: getProductDetail(product) };
  },
  head: ({ params, loaderData }) => {
    const title = loaderData ? `${loaderData.product.title} | گل‌سا` : "جزئیات محصول | گل‌سا";
    const desc = loaderData
      ? `خرید ${loaderData.product.title} از ${loaderData.product.brand} با ضمانت اصالت و ارسال سریع.`
      : "جزئیات کامل محصول در فروشگاه گل‌سا.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/product/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/product/${params.slug}` }],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">محصول یافت نشد</h1>
        <p className="mt-2 text-muted-foreground">صفحه‌ای که دنبال آن بودید موجود نیست.</p>
        <Link to="/" className="mt-6 inline-block rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground">بازگشت به خانه</Link>
      </main>
      <Footer />
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-20 text-center" role="alert">
        <h1 className="text-2xl font-bold">خطا در بارگذاری</h1>
        <p className="mt-2 text-muted-foreground">{error.message}</p>
      </main>
      <Footer />
    </div>
  ),
  component: ProductPage,
});

const TABS = [
  { id: "desc", label: "توضیحات" },
  { id: "ingredients", label: "ترکیبات" },
  { id: "usage", label: "روش مصرف" },
  { id: "specs", label: "مشخصات" },
  { id: "reviews", label: "نظرات" },
] as const;

type TabId = (typeof TABS)[number]["id"];

function ProductPage() {
  const { product: p, detail } = Route.useLoaderData() as { product: Product; detail: ProductDetail };
  const [qty, setQty] = useState(1);
  const [variant, setVariant] = useState(0);
  const [tab, setTab] = useState<TabId>("desc");
  const [wish, setWish] = useState(false);

  const off = p.oldPrice ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0;

  const related = PRODUCTS.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4);
  const complementary = PRODUCTS.filter((x) => x.category !== p.category).slice(0, 4);

  // rating breakdown
  const dist = [
    { stars: 5, pct: 72 },
    { stars: 4, pct: 18 },
    { stars: 3, pct: 6 },
    { stars: 2, pct: 3 },
    { stars: 1, pct: 1 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-6 md:py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary">خانه</Link>
          <ChevronLeft className="h-3.5 w-3.5 rotate-180" />
          <span className="hover:text-primary">{p.category}</span>
          <ChevronLeft className="h-3.5 w-3.5 rotate-180" />
          <span className="text-foreground truncate">{p.title}</span>
        </nav>

        {/* Top section */}
        <section className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <ProductGallery images={detail.gallery} title={p.title} badge={p.badge} />

          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">{p.brand}</span>
            <h1 className="mt-1 text-2xl md:text-3xl font-black leading-snug">{p.title}</h1>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.round(p.rating) ? "fill-gold text-gold" : "text-muted-foreground/30"}`} />
                ))}
                <span className="ms-1 font-semibold">{p.rating.toLocaleString("fa-IR")}</span>
              </div>
              <span className="text-muted-foreground">({p.reviews.toLocaleString("fa-IR")} نظر)</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{p.sold.toLocaleString("fa-IR")} فروش</span>
              <span className="text-muted-foreground">•</span>
              <span className="inline-flex items-center gap-1 text-emerald-700">
                <Check className="h-3.5 w-3.5" /> موجود در انبار
              </span>
            </div>

            {/* Highlights */}
            <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {detail.highlights.slice(0, 4).map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm text-foreground/80">
                  <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-rose-soft text-primary">
                    <Sparkles className="h-3 w-3" />
                  </span>
                  {h}
                </li>
              ))}
            </ul>

            {/* Suitable for */}
            <div className="mt-5">
              <div className="text-xs font-semibold text-muted-foreground mb-2">مناسب برای</div>
              <div className="flex flex-wrap gap-2">
                {detail.suitableFor.map((s) => (
                  <span key={s} className="rounded-full border border-primary/30 bg-rose-soft/50 px-3 py-1 text-xs text-foreground">{s}</span>
                ))}
              </div>
            </div>

            {/* Variants */}
            {detail.variants && (
              <div className="mt-5">
                <div className="text-xs font-semibold text-muted-foreground mb-2">رنگ: <span className="text-foreground">{detail.variants[variant]?.label}</span></div>
                <div className="flex flex-wrap gap-2">
                  {detail.variants.map((v, i) => (
                    <button
                      key={v.label}
                      type="button"
                      onClick={() => setVariant(i)}
                      aria-label={v.label}
                      className={`h-9 w-9 rounded-full border-2 transition ${variant === i ? "border-primary shadow-soft scale-110" : "border-border"}`}
                      style={{ background: v.color }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Price card */}
            <div className="mt-6 rounded-3xl border border-border bg-card p-5 shadow-soft">
              <div className="flex items-end justify-between gap-3">
                <div>
                  {p.oldPrice && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground line-through">{formatToman(p.oldPrice)}</span>
                      {off > 0 && <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">{off.toLocaleString("fa-IR")}٪ تخفیف</span>}
                    </div>
                  )}
                  <div className="mt-1 text-2xl md:text-3xl font-black text-primary">{formatToman(p.price)}</div>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background p-1">
                  <button type="button" onClick={() => setQty(Math.max(1, qty - 1))} className="grid h-8 w-8 place-items-center rounded-full hover:bg-rose-soft" aria-label="کاهش"><Minus className="h-4 w-4" /></button>
                  <span className="min-w-6 text-center text-sm font-bold">{qty.toLocaleString("fa-IR")}</span>
                  <button type="button" onClick={() => setQty(qty + 1)} className="grid h-8 w-8 place-items-center rounded-full hover:bg-rose-soft" aria-label="افزایش"><Plus className="h-4 w-4" /></button>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button type="button" className="flex-1 min-w-[180px] inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-soft hover:shadow-glow transition">
                  <ShoppingBag className="h-4 w-4" /> افزودن به سبد خرید
                </button>
                <button type="button" onClick={() => setWish((w) => !w)} aria-label="علاقه‌مندی" className={`grid h-12 w-12 place-items-center rounded-full border border-border transition ${wish ? "bg-rose-soft text-primary" : "bg-background hover:bg-rose-soft/50"}`}>
                  <Heart className={`h-5 w-5 ${wish ? "fill-primary" : ""}`} />
                </button>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2 text-[11px] md:text-xs">
                <div className="flex flex-col items-center gap-1 rounded-2xl bg-rose-soft/40 p-3 text-center"><Truck className="h-4 w-4 text-primary" /> ارسال سریع</div>
                <div className="flex flex-col items-center gap-1 rounded-2xl bg-rose-soft/40 p-3 text-center"><ShieldCheck className="h-4 w-4 text-primary" /> ضمانت اصالت</div>
                <div className="flex flex-col items-center gap-1 rounded-2xl bg-rose-soft/40 p-3 text-center"><Undo2 className="h-4 w-4 text-primary" /> ۷ روز مرجوعی</div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="mt-12">
          <div className="flex flex-wrap gap-2 border-b border-border">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`relative px-4 py-3 text-sm font-semibold transition ${tab === t.id ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                {t.label}
                {tab === t.id && <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-primary" />}
              </button>
            ))}
          </div>

          <div className="mt-6">
            {tab === "desc" && (
              <div className="grid gap-6 md:grid-cols-[1.5fr_1fr]">
                <div className="rounded-3xl border border-border bg-card p-6 leading-loose text-sm md:text-base text-foreground/85">
                  {detail.description}
                </div>
                <ul className="rounded-3xl border border-border bg-card p-6 space-y-3">
                  {detail.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 text-primary" /> {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {tab === "ingredients" && (
              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                {detail.ingredients.map((it) => (
                  <div key={it} className="rounded-2xl border border-border bg-card p-4 flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-rose-soft text-primary">✿</span>
                    <span className="text-sm font-medium">{it}</span>
                  </div>
                ))}
              </div>
            )}

            {tab === "usage" && (
              <ol className="space-y-3">
                {detail.usage.map((step, i) => (
                  <li key={i} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground font-bold">{(i + 1).toLocaleString("fa-IR")}</span>
                    <p className="text-sm leading-relaxed text-foreground/85">{step}</p>
                  </li>
                ))}
              </ol>
            )}

            {tab === "specs" && (
              <div className="overflow-hidden rounded-3xl border border-border bg-card">
                <dl className="divide-y divide-border">
                  {detail.specs.map((s) => (
                    <div key={s.label} className="grid grid-cols-[140px_1fr] gap-4 px-5 py-3 text-sm">
                      <dt className="text-muted-foreground">{s.label}</dt>
                      <dd className="font-medium">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {tab === "reviews" && (
              <div className="grid gap-6 md:grid-cols-[1fr_1.5fr]">
                <aside className="space-y-5">
                  <div className="rounded-3xl border border-border bg-card p-6 text-center">
                    <div className="text-5xl font-black text-primary">{p.rating.toLocaleString("fa-IR")}</div>
                    <div className="mt-2 flex justify-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.round(p.rating) ? "fill-gold text-gold" : "text-muted-foreground/30"}`} />
                      ))}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">از مجموع {p.reviews.toLocaleString("fa-IR")} نظر</div>
                    <div className="mt-5 space-y-2">
                      {dist.map((d) => (
                        <div key={d.stars} className="flex items-center gap-2 text-xs">
                          <span className="w-3 text-muted-foreground">{d.stars.toLocaleString("fa-IR")}</span>
                          <Star className="h-3 w-3 fill-gold text-gold" />
                          <div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
                            <div className="h-full rounded-full bg-primary" style={{ width: `${d.pct}%` }} />
                          </div>
                          <span className="w-8 text-muted-foreground">{d.pct.toLocaleString("fa-IR")}٪</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <ReviewForm />
                </aside>

                <div className="space-y-4">
                  {detail.reviews.map((r, i) => (
                    <article key={i} className="rounded-2xl border border-border bg-card p-5">
                      <header className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="grid h-10 w-10 place-items-center rounded-full bg-rose-soft text-primary font-bold">
                            {r.name.charAt(0)}
                          </div>
                          <div>
                            <div className="text-sm font-bold">{r.name}</div>
                            <div className="text-[11px] text-muted-foreground">{r.date}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <Star key={j} className={`h-3.5 w-3.5 ${j < r.rating ? "fill-gold text-gold" : "text-muted-foreground/30"}`} />
                          ))}
                        </div>
                      </header>
                      <h4 className="mt-3 text-sm font-bold">{r.title}</h4>
                      <p className="mt-1 text-sm text-foreground/80 leading-relaxed">{r.text}</p>
                      {r.verified && (
                        <div className="mt-3 inline-flex items-center gap-1 text-[11px] text-emerald-700">
                          <Check className="h-3 w-3" /> خرید تأیید شده
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-14">
            <div className="flex items-end justify-between gap-3 mb-5">
              <h2 className="text-xl md:text-2xl font-black">محصولات مشابه</h2>
              <Link to="/category/$slug" params={{ slug: "skincare" }} className="text-xs font-semibold text-primary hover:underline">مشاهده همه</Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {related.map((rp) => <ProductCard key={rp.id} p={rp} />)}
            </div>
          </section>
        )}

        {complementary.length > 0 && (
          <section className="mt-12">
            <div className="flex items-end justify-between gap-3 mb-5">
              <h2 className="text-xl md:text-2xl font-black">پیشنهاد مکمل برای شما</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {complementary.map((rp) => <ProductCard key={rp.id} p={rp} />)}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}