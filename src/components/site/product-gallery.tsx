import { useRef, useState } from "react";
import { ZoomIn } from "lucide-react";

export function ProductGallery({ images, title, badge }: { images: string[]; title: string; badge?: string }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const boxRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = boxRef.current?.getBoundingClientRect();
    if (!r) return;
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    setPos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  return (
    <div className="grid grid-cols-[72px_1fr] gap-3 md:gap-4">
      <div className="flex flex-col gap-2">
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            className={`relative overflow-hidden rounded-xl border-2 transition aspect-square bg-rose-soft/40 ${active === i ? "border-primary shadow-soft" : "border-border hover:border-primary/40"}`}
            aria-label={`تصویر ${i + 1}`}
          >
            <img src={img} alt="" className="h-full w-full object-cover" loading="lazy" />
          </button>
        ))}
      </div>

      <div
        ref={boxRef}
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={onMove}
        className="relative aspect-square overflow-hidden rounded-3xl border border-border bg-rose-soft/40 cursor-zoom-in"
      >
        <img
          src={images[active]}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-200"
          style={zoom ? { transform: "scale(2)", transformOrigin: `${pos.x}% ${pos.y}%` } : undefined}
        />
        {badge && (
          <span className="absolute top-4 start-4 rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground shadow-soft">
            {badge}
          </span>
        )}
        <span className="absolute bottom-4 end-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur px-3 py-1.5 text-xs font-medium text-foreground shadow-soft pointer-events-none">
          <ZoomIn className="h-3.5 w-3.5" /> برای زوم نشانگر را حرکت دهید
        </span>
      </div>
    </div>
  );
}