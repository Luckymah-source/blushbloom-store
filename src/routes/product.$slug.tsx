import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/site/page-shell";

export const Route = createFileRoute("/product/$slug")({
  head: () => ({ meta: [{ title: "جزئیات محصول | گل‌سا" }] }),
  component: () => <ComingSoon title="جزئیات محصول" subtitle="صفحه کامل محصول با گالری، مشخصات و نظرات در فاز ۲ تکمیل می‌شود." />,
});