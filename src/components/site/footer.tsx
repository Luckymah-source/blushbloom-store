import { Link } from "@tanstack/react-router";
import { Instagram, Send, Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-gradient-to-b from-rose-soft/40 to-background">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="grid h-10 w-10 place-items-center rounded-full gradient-rose text-white font-bold shadow-soft">آ</div>
              <span className="text-lg font-bold text-gradient-rose">آشنا پرفیوم</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              فروشگاه آنلاین محصولات اصل آرایشی، بهداشتی و مراقبت از پوست با تضمین اصالت و ارسال به سراسر ایران.
            </p>
            <div className="mt-5 flex gap-2">
              <a href="#" aria-label="اینستاگرام" className="grid h-10 w-10 place-items-center rounded-full bg-white shadow-soft hover:text-primary"><Instagram className="h-4 w-4" /></a>
              <a href="#" aria-label="تلگرام" className="grid h-10 w-10 place-items-center rounded-full bg-white shadow-soft hover:text-primary"><Send className="h-4 w-4" /></a>
            </div>
          </div>

          <FooterCol title="دسترسی سریع" items={[
            { label: "صفحه اصلی", to: "/" },
            { label: "درباره ما", to: "/about" },
            { label: "تماس با ما", to: "/contact" },
            { label: "مجله زیبایی", to: "/blog" },
            { label: "برندها", to: "/brands" },
          ]} />

          <FooterCol title="راهنما" items={[
            { label: "سوالات متداول", to: "/faq" },
            { label: "قوانین و مقررات", to: "/terms" },
            { label: "حریم خصوصی", to: "/privacy" },
            { label: "رویه ارسال", to: "/shipping" },
            { label: "پیگیری سفارش", to: "/auth" },
          ]} />

          <div>
            <h4 className="mb-4 font-bold">تماس با ما</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />تهران، خیابان ولیعصر، پلاک ۱۲۳۴</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0 text-primary" />۰۲۱-۱۲۳۴۵۶۷۸</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0 text-primary" />support@ashnaperfume.shop</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row">
          <span>© ۱۴۰۴ آشنا پرفیوم. تمامی حقوق محفوظ است.</span>
          <span>طراحی و توسعه با ❤ در ایران</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { label: string; to: string }[] }) {
  return (
    <div>
      <h4 className="mb-4 font-bold">{title}</h4>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {items.map((it) => (
          <li key={it.to}>
            <Link to={it.to} className="hover:text-primary transition">{it.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}