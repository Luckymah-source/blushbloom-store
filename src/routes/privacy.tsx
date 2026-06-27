import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/page-shell";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "حریم خصوصی | گل‌سا" }] }),
  component: () => (
    <PageShell title="حریم خصوصی">
      <div className="mx-auto max-w-3xl space-y-3 text-sm leading-loose text-foreground/80">
        <p>گل‌سا متعهد به حفاظت از اطلاعات شخصی شماست. اطلاعات تماس و سفارش‌ها صرفاً برای پردازش خرید و پشتیبانی استفاده می‌شوند و در اختیار شخص ثالث قرار نمی‌گیرند.</p>
        <p>تصویر رسید پرداخت تنها برای بررسی پرداخت توسط تیم مالی استفاده می‌شود.</p>
      </div>
    </PageShell>
  ),
});