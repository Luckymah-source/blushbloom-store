import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/page-shell";
import { FAQS } from "@/lib/mock-data";

export const Route = createFileRoute("/faq")({
  head: () => ({ meta: [{ title: "سوالات متداول | گل‌سا" }, { name: "description", content: "پاسخ پرسش‌های رایج درباره خرید، ارسال و پرداخت." }] }),
  component: () => (
    <PageShell title="سوالات متداول" subtitle="پاسخ پرتکرارترین پرسش‌های شما.">
      <div className="mx-auto max-w-3xl space-y-3">
        {FAQS.map((f, i) => (
          <details key={i} className="group rounded-2xl border border-border bg-card p-5 open:shadow-soft">
            <summary className="cursor-pointer list-none font-bold flex items-center justify-between">
              {f.q}<span className="text-primary text-xl group-open:rotate-45 transition">+</span>
            </summary>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>
    </PageShell>
  ),
});