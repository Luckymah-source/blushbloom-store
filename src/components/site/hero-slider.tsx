import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SLIDES } from "@/lib/mock-data";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const IMAGES = [hero1, hero2, hero3];

export function HeroSlider() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % SLIDES.length), 6000);
    return () => clearInterval(t);
  }, []);

  const prev = () => setI((p) => (p - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setI((p) => (p + 1) % SLIDES.length);

  return (
    <section className="relative mx-auto max-w-7xl px-4 pt-6">
      <div className="relative overflow-hidden rounded-4xl shadow-soft">
        <div className="relative aspect-[16/8] md:aspect-[16/6] bg-rose-soft">
          {SLIDES.map((s, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-700 ${idx === i ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            >
              <img
                src={IMAGES[idx]}
                alt={s.title}
                width={1600}
                height={900}
                {...(idx === 0 ? { fetchPriority: "high" as const } : { loading: "lazy" as const })}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-white/85 via-white/50 to-transparent" />
              <div className="absolute inset-0 flex items-center">
                <div className="ms-6 md:ms-14 max-w-md">
                  <span className="inline-block rounded-full bg-primary/15 text-primary px-3 py-1 text-xs font-bold">{s.tag}</span>
                  <h2 className="mt-4 text-2xl md:text-5xl font-black leading-tight text-foreground">{s.title}</h2>
                  <p className="mt-3 text-sm md:text-base text-foreground/80">{s.subtitle}</p>
                  <Link
                    to={s.href}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-soft hover:shadow-glow transition"
                  >
                    {s.cta}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button onClick={prev} aria-label="قبلی" className="absolute top-1/2 start-3 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-white/90 shadow-soft hover:bg-white">
          <ChevronRight className="h-5 w-5" />
        </button>
        <button onClick={next} aria-label="بعدی" className="absolute top-1/2 end-3 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-white/90 shadow-soft hover:bg-white">
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`اسلاید ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-primary" : "w-2 bg-white/80"}`}
            />
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { t: "ارسال سریع", d: "به سراسر ایران" },
          { t: "ضمانت اصالت", d: "کالا اصل و گارانتی" },
          { t: "پرداخت امن", d: "کارت‌به‌کارت تایید‌شده" },
          { t: "بازگشت کالا", d: "تا ۷ روز پس از خرید" },
        ].map((f) => (
          <div key={f.t} className="glass rounded-2xl p-4 text-center">
            <div className="text-sm font-bold">{f.t}</div>
            <div className="text-xs text-muted-foreground mt-1">{f.d}</div>
          </div>
        ))}
      </div>
    </section>
  );
}