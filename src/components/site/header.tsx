import { Link } from "@tanstack/react-router";
import { Search, ShoppingBag, Heart, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { CATEGORIES } from "@/lib/mock-data";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="bg-primary/95 text-primary-foreground text-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
          <span>ارسال رایگان برای سفارش‌های بالای ۹۹۰ هزار تومان</span>
          <span className="hidden sm:inline">۰۲۱-۱۲۳۴۵۶۷۸ • support@ashnaperfume.shop</span>
        </div>
      </div>

      <div className="glass border-b border-border/60">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4">
          <button
            className="lg:hidden -ms-2 grid h-10 w-10 place-items-center rounded-full hover:bg-rose-soft"
            onClick={() => setOpen(true)}
            aria-label="منو"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="grid h-10 w-10 place-items-center rounded-full gradient-rose text-white font-bold shadow-soft">
              آ
            </div>
            <div className="hidden sm:block">
              <div className="text-lg font-bold leading-none text-gradient-rose">آشنا پرفیوم</div>
              <div className="text-[10px] text-muted-foreground">فروشگاه عطر، آرایشی و مراقبت</div>
            </div>
          </Link>

          <div className="flex-1 min-w-0">
            <div className="relative max-w-xl mx-auto">
              <Search className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="جستجوی محصول، برند یا دسته‌بندی…"
                className="w-full rounded-full border border-border bg-white/80 ps-4 pe-10 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1 shrink-0">
            <IconLink to="/wishlist" label="علاقه‌مندی‌ها" icon={<Heart className="h-5 w-5" />} />
            <IconLink to="/cart" label="سبد خرید" icon={<ShoppingBag className="h-5 w-5" />} badge={2} />
            <IconLink to="/auth" label="حساب" icon={<User className="h-5 w-5" />} />
          </nav>

          <div className="flex md:hidden items-center gap-1 shrink-0">
            <Link to="/cart" className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-rose-soft">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-0.5 -end-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">۲</span>
            </Link>
          </div>
        </div>

        <nav className="hidden lg:block border-t border-border/40">
          <div className="mx-auto flex max-w-7xl items-center gap-1 px-4 py-2 overflow-x-auto">
            <Link to="/" className="rounded-full px-4 py-2 text-sm font-medium hover:bg-rose-soft transition">صفحه اصلی</Link>
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                to="/category/$slug"
                params={{ slug: c.slug }}
                className="whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium hover:bg-rose-soft transition"
              >
                {c.title}
              </Link>
            ))}
            <Link to="/brands" className="rounded-full px-4 py-2 text-sm font-medium hover:bg-rose-soft transition">برندها</Link>
            <Link to="/blog" className="rounded-full px-4 py-2 text-sm font-medium hover:bg-rose-soft transition">مجله</Link>
            <Link to="/about" className="rounded-full px-4 py-2 text-sm font-medium hover:bg-rose-soft transition">درباره ما</Link>
          </div>
        </nav>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" />
          <aside className="absolute inset-y-0 end-0 w-80 max-w-[85vw] bg-background p-6 shadow-glow" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <span className="text-lg font-bold text-gradient-rose">آشنا پرفیوم</span>
              <button onClick={() => setOpen(false)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-rose-soft">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="space-y-1">
              <MobileLink to="/" label="صفحه اصلی" onSelect={() => setOpen(false)} />
              {CATEGORIES.map((c) => (
                <Link
                  key={c.slug}
                  to="/category/$slug"
                  params={{ slug: c.slug }}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 hover:bg-rose-soft"
                >
                  <span className="text-primary">{c.icon}</span>
                  <span>{c.title}</span>
                </Link>
              ))}
              <MobileLink to="/brands" label="برندها" onSelect={() => setOpen(false)} />
              <MobileLink to="/blog" label="مجله" onSelect={() => setOpen(false)} />
              <MobileLink to="/about" label="درباره ما" onSelect={() => setOpen(false)} />
              <MobileLink to="/contact" label="تماس با ما" onSelect={() => setOpen(false)} />
              <MobileLink to="/auth" label="ورود / ثبت‌نام" onSelect={() => setOpen(false)} />
            </nav>
          </aside>
        </div>
      )}
    </header>
  );
}

function IconLink({ to, label, icon, badge }: { to: string; label: string; icon: React.ReactNode; badge?: number }) {
  return (
    <Link to={to} aria-label={label} className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-rose-soft transition">
      {icon}
      {badge ? (
        <span className="absolute -top-0.5 -end-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
          {new Intl.NumberFormat("fa-IR").format(badge)}
        </span>
      ) : null}
    </Link>
  );
}

function MobileLink({ to, label, onSelect }: { to: string; label: string; onSelect: () => void }) {
  return (
    <Link to={to} onClick={onSelect} className="block rounded-xl px-3 py-3 font-medium hover:bg-rose-soft">
      {label}
    </Link>
  );
}