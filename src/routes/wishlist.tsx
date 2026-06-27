import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/site/page-shell";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "علاقه‌مندی‌ها | گل‌سا" }] }),
  component: () => <ComingSoon title="علاقه‌مندی‌ها" subtitle="لیست محصولات مورد علاقه شما در فاز ۳ فعال می‌شود." />,
});