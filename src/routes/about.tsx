import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/page-shell";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "درباره ما | گل‌سا" }, { name: "description", content: "داستان گل‌سا، فروشگاه آنلاین محصولات آرایشی و مراقبت از پوست." }] }),
  component: () => (
    <PageShell title="درباره گل‌سا" subtitle="ما برای زیبایی واقعی شما اینجاییم.">
      <div className="mx-auto max-w-3xl space-y-4 text-foreground/85 leading-loose">
        <p>گل‌سا فروشگاهی آنلاین برای ارائه‌ی محصولات اصل آرایشی، بهداشتی، مراقبت از پوست، عطر و اسپری از برندهای معتبر دنیاست. ما باور داریم زیبایی یعنی اعتمادبه‌نفس، و این اعتماد از کیفیت محصولاتی که استفاده می‌کنید آغاز می‌شود.</p>
        <p>تمامی محصولات گل‌سا با گارانتی اصالت و مستقیماً از نمایندگی‌های رسمی برندها تأمین می‌شوند. هدف ما این است که خرید آنلاین لوازم زیبایی را به تجربه‌ای امن، آسان و لذت‌بخش تبدیل کنیم.</p>
      </div>
    </PageShell>
  ),
});