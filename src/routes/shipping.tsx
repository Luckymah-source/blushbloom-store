import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/page-shell";

export const Route = createFileRoute("/shipping")({
  head: () => ({ meta: [{ title: "رویه ارسال | گل‌سا" }] }),
  component: () => (
    <PageShell title="رویه ارسال" subtitle="اطلاعات کامل درباره ارسال و تحویل سفارش‌ها.">
      <div className="mx-auto max-w-3xl space-y-3 text-sm leading-loose text-foreground/80">
        <p>سفارش‌های شما پس از تایید پرداخت ظرف ۱ تا ۳ روز کاری آماده‌سازی و ارسال می‌شوند. ارسال به سراسر ایران از طریق پست پیشتاز و تیپاکس انجام می‌گیرد.</p>
        <p>ارسال برای سفارش‌های بالای ۹۹۰ هزار تومان رایگان است.</p>
      </div>
    </PageShell>
  ),
});