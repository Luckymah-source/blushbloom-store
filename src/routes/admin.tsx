import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  fetchAllProductsAdmin,
  createProduct,
  updateProduct,
  deleteProduct,
  checkIsAdmin,
  type DBProduct,
  type ProductInput,
} from "@/lib/products-api";
import { fetchActiveBrands } from "@/lib/brands-api";
import { AdminBrands } from "@/components/site/admin-brands";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "پنل مدیریت — آشنا پرفیوم" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

const CATEGORIES = [
  { value: "perfume", label: "عطر و ادکلن" },
  { value: "skincare", label: "مراقبت از پوست" },
  { value: "makeup", label: "آرایش صورت" },
  { value: "lips", label: "آرایش لب" },
  { value: "hair", label: "مراقبت از مو" },
  { value: "body", label: "بدن و حمام" },
];
const FALLBACK_BRANDS = ["آشنا پرفیوم"];
const BADGES = ["", "پرفروش", "جدید", "تخفیف", "ویژه"];

function fa(n: number | null | undefined) {
  if (n == null) return "—";
  return Number(n).toLocaleString("fa-IR") + " تومان";
}
function catLabel(v: string) {
  return CATEGORIES.find((c) => c.value === v)?.label || v;
}
function slugify(s: string) {
  return s.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-_\u0600-\u06FF]/g, "");
}

type AuthState = "loading" | "anon" | "user" | "admin";

function AdminPage() {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState<AuthState>("loading");
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    let mounted = true;
    const check = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (!mounted) return;
        if (error || !data.user) {
          setAuthState("anon");
          return;
        }
        setUserEmail(data.user.email || "");
        const isAdmin = await checkIsAdmin(data.user.id).catch(() => false);
        if (!mounted) return;
        setAuthState(isAdmin ? "admin" : "user");
      } catch (e) {
        console.error("[admin] auth check failed", e);
        if (mounted) setAuthState("anon");
      }
    };
    check();
    const { data: sub } = supabase.auth.onAuthStateChange(() => check());
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  if (authState === "loading") {
    return <div className="min-h-screen grid place-items-center text-muted-foreground">در حال بارگذاری...</div>;
  }
  if (authState === "anon") {
    return (
      <div className="min-h-screen grid place-items-center px-4 bg-rose-soft/30">
        <div className="max-w-md text-center bg-card rounded-3xl border border-border p-8 shadow-soft">
          <div className="mx-auto w-14 h-14 rounded-full bg-primary text-primary-foreground grid place-items-center text-2xl font-black mb-4">آ</div>
          <h1 className="text-xl font-black mb-2">پنل مدیریت آشنا پرفیوم</h1>
          <p className="text-sm text-muted-foreground mb-6">برای دسترسی، ابتدا وارد حساب ادمین شوید.</p>
          <button onClick={() => navigate({ to: "/auth", search: { redirect: "/admin" } })}
            className="w-full rounded-xl bg-primary text-primary-foreground py-3 text-sm font-bold hover:opacity-90">
            ورود به حساب
          </button>
          <Link to="/" className="block mt-4 text-xs text-muted-foreground hover:text-primary">بازگشت به فروشگاه</Link>
        </div>
      </div>
    );
  }
  if (authState === "user") {
    return (
      <div className="min-h-screen grid place-items-center px-4 bg-rose-soft/30">
        <div className="max-w-md text-center bg-card rounded-3xl border border-border p-8 shadow-soft">
          <div className="text-5xl mb-3">🚫</div>
          <h1 className="text-xl font-black mb-2">دسترسی محدود</h1>
          <p className="text-sm text-muted-foreground mb-2">حساب <span dir="ltr" className="font-mono">{userEmail}</span> دسترسی ادمین ندارد.</p>
          <p className="text-xs text-muted-foreground mb-6">برای تبدیل این حساب به ادمین، با مدیر سیستم تماس بگیرید.</p>
          <button onClick={async () => { await supabase.auth.signOut(); }}
            className="w-full rounded-xl bg-secondary text-secondary-foreground py-3 text-sm font-bold hover:opacity-90">
            خروج از حساب
          </button>
          <Link to="/" className="block mt-4 text-xs text-muted-foreground hover:text-primary">بازگشت به فروشگاه</Link>
        </div>
      </div>
    );
  }

  return <AdminDashboard email={userEmail} />;
}

const EMPTY_FORM = {
  slug: "",
  name: "",
  brand: FALLBACK_BRANDS[0],
  category: "perfume",
  price: "",
  discount_price: "",
  stock: "",
  description: "",
  badge: "",
  image: "",
  is_active: true,
};

function AdminDashboard({ email }: { email: string }) {
  const qc = useQueryClient();
  const [tab, setTab] = useState<"products" | "brands">("products");
  const [view, setView] = useState<"list" | "form" | "delete">("list");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("all");

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["admin-products"],
    queryFn: fetchAllProductsAdmin,
  });

  const { data: dbBrands = [] } = useQuery({
    queryKey: ["brands"],
    queryFn: fetchActiveBrands,
  });
  const brandOptions = dbBrands.length > 0 ? dbBrands.map((b) => b.name) : FALLBACK_BRANDS;

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["admin-products"] });
    qc.invalidateQueries({ queryKey: ["products"] });
  };

  const createMut = useMutation({
    mutationFn: createProduct,
    onSuccess: () => { invalidate(); toast.success("محصول جدید اضافه شد ✓"); setView("list"); },
    onError: (e: Error) => toast.error("خطا در افزودن: " + e.message),
  });
  const updateMut = useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<ProductInput> }) => updateProduct(id, input),
    onSuccess: () => { invalidate(); toast.success("محصول ویرایش شد ✓"); setView("list"); },
    onError: (e: Error) => toast.error("خطا در ویرایش: " + e.message),
  });
  const deleteMut = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => { invalidate(); toast.success("محصول حذف شد"); setView("list"); setDeleteId(null); },
    onError: (e: Error) => toast.error("خطا در حذف: " + e.message),
  });

  function openAdd() {
    setForm({ ...EMPTY_FORM });
    setEditingId(null);
    setView("form");
  }
  function openEdit(p: DBProduct) {
    setForm({
      slug: p.slug,
      name: p.name,
      brand: p.brand,
      category: p.category,
      price: String(p.price),
      discount_price: p.discount_price != null ? String(p.discount_price) : "",
      stock: String(p.stock),
      description: p.description || "",
      badge: p.badge || "",
      image: p.image || "",
      is_active: p.is_active,
    });
    setEditingId(p.id);
    setView("form");
  }
  function handleSave() {
    if (!form.name || !form.price || !form.stock) {
      toast.error("نام، قیمت و موجودی الزامی است.");
      return;
    }
    const slug = form.slug || slugify(form.name) || "product-" + Date.now();
    const input: ProductInput = {
      slug,
      name: form.name,
      brand: form.brand,
      category: form.category,
      price: Number(form.price),
      discount_price: form.discount_price ? Number(form.discount_price) : null,
      stock: Number(form.stock),
      description: form.description || null,
      badge: form.badge || null,
      image: form.image || null,
      is_active: form.is_active,
    };
    if (editingId) updateMut.mutate({ id: editingId, input });
    else createMut.mutate(input);
  }

  const filtered = products.filter((p) => {
    const s = search.trim();
    const matchS = !s || p.name.includes(s) || p.brand.includes(s);
    const matchC = filterCat === "all" || p.category === filterCat;
    return matchS && matchC;
  });
  const totalStock = products.reduce((s, p) => s + p.stock, 0);
  const lowStock = products.filter((p) => p.stock < 10).length;

  return (
    <div dir="rtl" className="min-h-screen bg-rose-soft/20">
      <header className="bg-gradient-to-l from-primary to-rose-glow text-primary-foreground shadow-soft">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/25 grid place-items-center text-lg font-black">آ</div>
            <div>
              <div className="font-black text-base">پنل مدیریت آشنا پرفیوم</div>
              <div className="text-[11px] opacity-80" dir="ltr">{email}</div>
            </div>
          </div>
          <div className="flex gap-2">
            {tab === "products" && view === "list" && (
              <button onClick={openAdd} className="bg-white text-primary rounded-xl px-4 py-2 text-sm font-bold hover:opacity-90">+ افزودن محصول</button>
            )}
            {tab === "products" && view !== "list" && (
              <button onClick={() => setView("list")} className="bg-white/15 border border-white/30 rounded-xl px-4 py-2 text-sm hover:bg-white/25">← بازگشت</button>
            )}
            <Link to="/" className="bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-xs hover:bg-white/20">سایت</Link>
            <button onClick={async () => { await supabase.auth.signOut(); }} className="bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-xs hover:bg-white/20">خروج</button>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 pb-3 flex gap-2">
          <button onClick={() => { setTab("products"); setView("list"); }}
            className={`rounded-xl px-4 py-2 text-sm font-bold transition ${tab === "products" ? "bg-white text-primary" : "bg-white/15 text-white hover:bg-white/25"}`}>
            محصولات
          </button>
          <button onClick={() => { setTab("brands"); setView("list"); }}
            className={`rounded-xl px-4 py-2 text-sm font-bold transition ${tab === "brands" ? "bg-white text-primary" : "bg-white/15 text-white hover:bg-white/25"}`}>
            برندها
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {tab === "brands" && <AdminBrands />}

        {tab === "products" && view === "list" && (
          <>
            <div className="grid grid-cols-3 gap-3 mb-6">
              <StatCard label="کل محصولات" value={products.length.toLocaleString("fa-IR")} color="bg-primary" />
              <StatCard label="موجودی کل" value={totalStock.toLocaleString("fa-IR") + " عدد"} color="bg-blue-500" />
              <StatCard label="موجودی کم" value={lowStock.toLocaleString("fa-IR") + " محصول"} color={lowStock > 0 ? "bg-orange-500" : "bg-green-500"} />
            </div>

            <div className="flex gap-2 mb-4 flex-wrap">
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="جستجو در نام یا برند..."
                className="flex-1 min-w-[180px] rounded-xl border border-border bg-card px-4 py-2 text-sm outline-none focus:border-primary" />
              <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)}
                className="rounded-xl border border-border bg-card px-4 py-2 text-sm">
                <option value="all">همه دسته‌ها</option>
                {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>

            {isLoading ? (
              <div className="text-center py-12 text-muted-foreground">در حال بارگذاری محصولات...</div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-12 bg-card rounded-2xl text-muted-foreground">محصولی یافت نشد</div>
            ) : (
              <div className="space-y-2">
                {filtered.map((p) => (
                  <div key={p.id} className="bg-card rounded-2xl border border-border p-3 flex items-center gap-3 flex-wrap">
                    <img src={p.image || "https://placehold.co/60"} alt={p.name}
                      className="w-14 h-14 rounded-xl object-cover border border-border shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm">{p.name}</span>
                        {p.badge && <span className="text-[10px] bg-rose-soft text-primary px-2 py-0.5 rounded-full font-bold">{p.badge}</span>}
                        {!p.is_active && <span className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full">غیرفعال</span>}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">{p.brand} • {catLabel(p.category)}</div>
                      <div className="flex gap-3 mt-1 text-xs flex-wrap">
                        <span className={p.discount_price ? "text-muted-foreground line-through" : "text-primary font-bold"}>{fa(p.price)}</span>
                        {p.discount_price && <span className="text-primary font-bold">{fa(p.discount_price)}</span>}
                        <span className={p.stock < 10 ? "text-orange-600" : "text-green-600"}>موجودی: {p.stock.toLocaleString("fa-IR")}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => openEdit(p)} className="bg-secondary text-secondary-foreground rounded-lg px-3 py-1.5 text-xs font-bold hover:opacity-80">ویرایش</button>
                      <button onClick={() => { setDeleteId(p.id); setView("delete"); }} className="bg-destructive/10 text-destructive rounded-lg px-3 py-1.5 text-xs font-bold hover:bg-destructive/20">حذف</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {view === "form" && (
          <div className="bg-card rounded-3xl border border-border p-6 max-w-3xl mx-auto">
            <h2 className="text-lg font-black text-primary mb-5">{editingId ? "ویرایش محصول" : "افزودن محصول جدید"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="نام محصول *" full>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} placeholder="مثلاً: عطر زنانه رز فرنچ" />
              </Field>
              <Field label="اسلاگ (URL)" full>
                <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className={inputCls} dir="ltr" placeholder="rose-perfume (اختیاری — خودکار ساخته می‌شود)" />
              </Field>
              <Field label="برند *">
                <select value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} className={inputCls}>
                  {brandOptions.map((b) => <option key={b}>{b}</option>)}
                </select>
              </Field>
              <Field label="دسته‌بندی *">
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputCls}>
                  {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </Field>
              <Field label="قیمت (تومان) *">
                <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className={inputCls} placeholder="1450000" />
              </Field>
              <Field label="قیمت با تخفیف (تومان)">
                <input type="number" value={form.discount_price} onChange={(e) => setForm({ ...form, discount_price: e.target.value })} className={inputCls} placeholder="اختیاری" />
              </Field>
              <Field label="موجودی *">
                <input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className={inputCls} placeholder="تعداد" />
              </Field>
              <Field label="برچسب">
                <select value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} className={inputCls}>
                  {BADGES.map((b) => <option key={b} value={b}>{b || "بدون برچسب"}</option>)}
                </select>
              </Field>
              <Field label="لینک تصویر" full>
                <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className={inputCls} dir="ltr" placeholder="https://..." />
              </Field>
              {form.image && (
                <div className="md:col-span-2">
                  <img src={form.image} alt="پیش‌نمایش" className="w-24 h-24 rounded-xl object-cover border border-border" onError={(e) => ((e.target as HTMLImageElement).style.display = "none")} />
                </div>
              )}
              <Field label="توضیحات" full>
                <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={inputCls} placeholder="توضیح کوتاه..." />
              </Field>
              <Field label="وضعیت" full>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} className="w-4 h-4" />
                  محصول فعال (در سایت نمایش داده شود)
                </label>
              </Field>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleSave} disabled={createMut.isPending || updateMut.isPending}
                className="bg-primary text-primary-foreground rounded-xl px-6 py-2.5 text-sm font-bold hover:opacity-90 disabled:opacity-60">
                {createMut.isPending || updateMut.isPending ? "در حال ذخیره..." : editingId ? "ذخیره تغییرات" : "افزودن محصول"}
              </button>
              <button onClick={() => setView("list")} className="bg-secondary text-secondary-foreground rounded-xl px-5 py-2.5 text-sm hover:opacity-80">انصراف</button>
            </div>
          </div>
        )}

        {view === "delete" && (
          <div className="bg-card rounded-3xl border border-border p-8 max-w-md mx-auto mt-12 text-center">
            <div className="text-5xl mb-3">🗑️</div>
            <h3 className="text-lg font-black text-destructive mb-2">حذف محصول</h3>
            <p className="text-sm text-muted-foreground mb-6">آیا مطمئن هستید؟ این عملیات قابل بازگشت نیست.</p>
            <div className="flex gap-2 justify-center">
              <button onClick={() => deleteId && deleteMut.mutate(deleteId)} disabled={deleteMut.isPending}
                className="bg-destructive text-destructive-foreground rounded-xl px-5 py-2.5 text-sm font-bold hover:opacity-90 disabled:opacity-60">
                {deleteMut.isPending ? "..." : "بله، حذف شود"}
              </button>
              <button onClick={() => setView("list")} className="bg-secondary text-secondary-foreground rounded-xl px-5 py-2.5 text-sm">انصراف</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

const inputCls = "w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary";

function Field({ label, full, children }: { label: string; full?: boolean; children: React.ReactNode }) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <label className="block text-xs font-bold text-muted-foreground mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="bg-card rounded-2xl border border-border p-4 relative overflow-hidden">
      <div className={`absolute top-0 inset-x-0 h-1 ${color}`} />
      <div className="text-2xl font-black">{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </div>
  );
}