import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/page-shell";
import { BRANDS } from "@/lib/mock-data";

export const Route = createFileRoute("/brands")({
  head: () => ({ meta: [{ title: "برندها | آشنا پرفیوم" }, { name: "description", content: "فهرست برندهای معتبر آرایشی و مراقبت از پوست در آشنا پرفیوم." }] }),
  component: () => (
    <PageShell title="برندهای ما" subtitle="با برندهای منتخب و معتبر فروشگاه آشنا پرفیوم آشنا شوید.">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {BRANDS.map((b) => (
          <div key={b} className="glass rounded-3xl h-32 flex items-center justify-center text-lg font-bold hover:text-primary transition">{b}</div>
        ))}
      </div>
    </PageShell>
  ),
});