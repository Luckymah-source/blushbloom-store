import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/page-shell";
import { Phone, Mail, MapPin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "تماس با ما | گل‌سا" }, { name: "description", content: "راه‌های ارتباط با پشتیبانی فروشگاه گل‌سا." }] }),
  component: () => (
    <PageShell title="تماس با ما" subtitle="ما همیشه آماده پاسخگویی به شما هستیم.">
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { i: <Phone className="h-5 w-5" />, t: "تلفن", d: "۰۲۱-۱۲۳۴۵۶۷۸" },
          { i: <Mail className="h-5 w-5" />, t: "ایمیل", d: "support@golsa.shop" },
          { i: <MapPin className="h-5 w-5" />, t: "نشانی", d: "تهران، خیابان ولیعصر، پلاک ۱۲۳۴" },
        ].map((c) => (
          <div key={c.t} className="glass-pink rounded-3xl p-6 text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-white text-primary shadow-soft">{c.i}</div>
            <div className="mt-3 font-bold">{c.t}</div>
            <div className="mt-1 text-sm text-muted-foreground">{c.d}</div>
          </div>
        ))}
      </div>
    </PageShell>
  ),
});