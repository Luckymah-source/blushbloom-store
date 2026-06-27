import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/site/page-shell";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "سبد خرید | آشنا پرفیوم" }] }),
  component: () => <ComingSoon title="سبد خرید" subtitle="سبد خرید کامل و فرایند تسویه در فاز ۳ افزوده می‌شود." />,
});