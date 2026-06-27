import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/site/page-shell";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "ورود / ثبت‌نام | آشنا پرفیوم" }] }),
  component: () => <ComingSoon title="ورود و ثبت‌نام" subtitle="سیستم احراز هویت در فاز ۳ فعال می‌شود." />,
});