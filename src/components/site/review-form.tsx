import { useState } from "react";
import { Star } from "lucide-react";

export function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  if (sent) {
    return (
      <div className="rounded-2xl border border-primary/30 bg-rose-soft/50 p-6 text-center">
        <div className="text-base font-bold">از نظر شما سپاسگزاریم 🌸</div>
        <p className="mt-1 text-sm text-foreground/70">نظر شما پس از تأیید توسط کارشناسان منتشر خواهد شد.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); if (rating && name && text) setSent(true); }}
      className="rounded-2xl border border-border bg-card p-5 space-y-4"
    >
      <div>
        <label className="text-sm font-medium">امتیاز شما</label>
        <div className="mt-2 flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <button
              key={i}
              type="button"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(i)}
              aria-label={`${i} ستاره`}
              className="p-1"
            >
              <Star className={`h-7 w-7 transition ${(hover || rating) >= i ? "fill-gold text-gold" : "text-muted-foreground/40"}`} />
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="نام و نام خانوادگی" className="rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary" />
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="عنوان نظر" className="rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary" />
      </div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={4} placeholder="تجربه‌ی خود از این محصول را بنویسید..." className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary resize-none" />
      <button type="submit" className="rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground shadow-soft hover:shadow-glow transition">
        ثبت نظر
      </button>
    </form>
  );
}