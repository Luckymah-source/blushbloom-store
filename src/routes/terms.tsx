import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/page-shell";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "قوانین و مقررات | گل‌سا" }] }),
  component: () => (
    <PageShell title="قوانین و مقررات">
      <div className="mx-auto max-w-3xl space-y-3 text-sm leading-loose text-foreground/80">
        <p>استفاده از فروشگاه گل‌سا به منزله پذیرش کلیه قوانین و مقررات زیر است. لطفاً پیش از ثبت سفارش، این موارد را مطالعه فرمایید.</p>
        <p>تمامی قیمت‌ها به تومان و شامل مالیات بر ارزش افزوده هستند.</p>
        <p>زمان آماده‌سازی و ارسال سفارش‌ها بین ۱ تا ۳ روز کاری پس از تایید پرداخت است.</p>
      </div>
    </PageShell>
  ),
});