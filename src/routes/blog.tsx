import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/page-shell";
import { POSTS } from "@/lib/mock-data";

export const Route = createFileRoute("/blog")({
  head: () => ({ meta: [{ title: "مجله زیبایی | گل‌سا" }, { name: "description", content: "مقالات آموزشی درباره مراقبت از پوست، آرایش و عطر." }] }),
  component: () => (
    <PageShell title="مجله زیبایی" subtitle="مقالات و آموزش‌های زیبایی، مراقبت از پوست و آرایش.">
      <div className="grid gap-4 md:grid-cols-3">
        {POSTS.map((p) => (
          <article key={p.slug} className="rounded-3xl border border-border bg-card p-5">
            <div className="aspect-[16/9] rounded-2xl gradient-rose mb-4" />
            <div className="text-xs text-muted-foreground">{p.date} • {p.readTime}</div>
            <h3 className="mt-2 text-base font-bold">{p.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
          </article>
        ))}
      </div>
    </PageShell>
  ),
});