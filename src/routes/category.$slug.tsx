import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/site/page-shell";
import { CATEGORIES } from "@/lib/mock-data";

export const Route = createFileRoute("/category/$slug")({
  head: ({ params }) => {
    const c = CATEGORIES.find((x) => x.slug === params?.slug);
    const name = c?.title ?? "دسته‌بندی";
    return {
      meta: [
        { title: `${name} | آشنا پرفیوم` },
        { name: "description", content: `خرید آنلاین محصولات ${name} از برندهای معتبر در فروشگاه آشنا پرفیوم.` },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { slug } = Route.useParams();
  const c = CATEGORIES.find((x) => x.slug === slug);
  return <ComingSoon title={c?.title ?? "دسته‌بندی"} subtitle="فهرست محصولات این دسته در فاز ۲ افزوده می‌شود." />;
}