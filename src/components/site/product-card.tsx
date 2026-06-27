import { Heart, ShoppingBag, Star } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/mock-data";
import { formatToman } from "@/lib/mock-data";

export function ProductCard({ p }: { p: Product }) {
  const off = p.oldPrice ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0;
  return (
    <Link
      to="/product/$slug"
      params={{ slug: p.slug }}
      className="group relative flex flex-col rounded-3xl border border-border bg-card p-3 transition hover:shadow-soft hover:-translate-y-1"
    >
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-rose-soft/50">
        <img
          src={p.image}
          alt={p.title}
          loading="lazy"
          width={800}
          height={800}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        {p.badge && (
          <span className="absolute top-3 start-3 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold text-primary-foreground shadow-soft">
            {p.badge}
          </span>
        )}
        {off > 0 && (
          <span className="absolute top-3 end-3 rounded-full bg-foreground/90 px-2 py-1 text-[10px] font-bold text-background">
            {new Intl.NumberFormat("fa-IR").format(off)}٪
          </span>
        )}
        <button
          type="button"
          aria-label="افزودن به علاقه‌مندی‌ها"
          onClick={(e) => { e.preventDefault(); }}
          className="absolute bottom-3 end-3 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-foreground shadow-soft opacity-0 transition group-hover:opacity-100 hover:text-primary"
        >
          <Heart className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-3 flex-1 flex flex-col">
        <span className="text-[11px] text-muted-foreground">{p.brand}</span>
        <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-relaxed">{p.title}</h3>

        <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3.5 w-3.5 fill-gold text-gold" />
          <span className="font-medium text-foreground">{p.rating.toLocaleString("fa-IR")}</span>
          <span>({p.reviews.toLocaleString("fa-IR")})</span>
        </div>

        <div className="mt-3 flex items-end justify-between gap-2">
          <div className="min-w-0">
            {p.oldPrice && (
              <div className="text-[11px] text-muted-foreground line-through">{formatToman(p.oldPrice)}</div>
            )}
            <div className="text-sm font-bold text-primary">{formatToman(p.price)}</div>
          </div>
          <button
            type="button"
            aria-label="افزودن به سبد"
            onClick={(e) => { e.preventDefault(); }}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground shadow-soft hover:shadow-glow transition"
          >
            <ShoppingBag className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Link>
  );
}