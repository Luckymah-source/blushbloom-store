import { createFileRoute, useNavigate, useSearch, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { toast } from "sonner";

type AuthSearch = { redirect?: string };

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "ورود / ثبت‌نام | آشنا پرفیوم" }] }),
  validateSearch: (s: Record<string, unknown>): AuthSearch => ({
    redirect: typeof s.redirect === "string" ? s.redirect : undefined,
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { redirect } = useSearch({ from: "/auth" });
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: redirect || "/" });
    });
  }, [navigate, redirect]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { display_name: name || email.split("@")[0] },
          },
        });
        if (error) throw error;
        toast.success("حساب کاربری ساخته شد ✓");
        navigate({ to: redirect || "/" });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("ورود با موفقیت انجام شد ✓");
        navigate({ to: redirect || "/" });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "خطا در عملیات";
      const fa = msg.includes("Invalid login") ? "ایمیل یا رمز عبور اشتباه است" :
                 msg.includes("already registered") || msg.includes("User already") ? "این ایمیل قبلاً ثبت شده است" :
                 msg.includes("Password should") ? "رمز عبور باید حداقل ۶ کاراکتر باشد" :
                 msg;
      toast.error(fa);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-soft">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-black">{mode === "login" ? "ورود به حساب" : "ساخت حساب جدید"}</h1>
            <p className="text-sm text-muted-foreground mt-1">آشنا پرفیوم — به دنیای زیبایی خوش آمدید</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label className="block text-sm font-semibold mb-1.5">نام و نام خانوادگی</label>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="مثلاً: نسترن محمدی"
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary" />
              </div>
            )}
            <div>
              <label className="block text-sm font-semibold mb-1.5">ایمیل</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" dir="ltr"
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">رمز عبور</label>
              <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" dir="ltr"
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full rounded-xl bg-primary text-primary-foreground py-3 text-sm font-bold hover:opacity-90 transition disabled:opacity-60">
              {loading ? "لطفاً صبر کنید..." : mode === "login" ? "ورود" : "ثبت‌نام"}
            </button>
          </form>
          <div className="mt-5 text-center text-sm text-muted-foreground">
            {mode === "login" ? (
              <>حساب ندارید؟ <button onClick={() => setMode("signup")} className="text-primary font-bold">ثبت‌نام کنید</button></>
            ) : (
              <>حساب دارید؟ <button onClick={() => setMode("login")} className="text-primary font-bold">وارد شوید</button></>
            )}
          </div>
          <div className="mt-4 text-center">
            <Link to="/" className="text-xs text-muted-foreground hover:text-primary">بازگشت به فروشگاه</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}