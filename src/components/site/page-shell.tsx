import { Header } from "./header";
import { Footer } from "./footer";
import type { ReactNode } from "react";

export function PageShell({ title, subtitle, children }: { title: string; subtitle?: string; children?: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-10">
        <div className="rounded-3xl gradient-rose px-6 py-10 md:py-14 text-center shadow-soft">
          <h1 className="text-2xl md:text-4xl font-black">{title}</h1>
          {subtitle && <p className="mt-3 text-sm md:text-base text-foreground/70 max-w-2xl mx-auto">{subtitle}</p>}
        </div>
        {children && <div className="mt-8">{children}</div>}
      </main>
      <Footer />
    </div>
  );
}

export function ComingSoon({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <PageShell title={title} subtitle={subtitle ?? "این بخش به‌زودی فعال می‌شود."}>
      <div className="rounded-3xl border border-border bg-card p-10 text-center text-muted-foreground">
        محتوای این صفحه در فاز بعدی پروژه تکمیل خواهد شد.
      </div>
    </PageShell>
  );
}