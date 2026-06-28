import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "پنل مدیریت — آشنا پرفیوم" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPanel,
});

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "Mahan824";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "9px 12px",
  borderRadius: 8,
  border: "1px solid #e8d5df",
  fontSize: 13,
  background: "#fff",
  outline: "none",
  fontFamily: "inherit",
  boxSizing: "border-box",
};

const selectStyle: React.CSSProperties = { ...inputStyle, cursor: "pointer" };

function Label({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: 12, color: "#666", marginBottom: 5, fontWeight: 600 }}>{children}</div>;
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} style={{ ...inputStyle, ...(props.style || {}) }} />;
}

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  function handleLogin() {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      onLogin();
    } else {
      setError("نام کاربری یا رمز عبور اشتباه است.");
    }
  }

  return (
    <div dir="rtl" style={{ fontFamily: "'Vazirmatn', Tahoma, sans-serif", minHeight: "100vh", background: "linear-gradient(135deg, #fdf0f5 0%, #f5e6f0 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: "#fff", borderRadius: 20, padding: 36, width: "100%", maxWidth: 380, boxShadow: "0 8px 40px rgba(180,80,120,0.12)" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ width: 60, height: 60, background: "linear-gradient(135deg, #c96b8a, #8b4e6b)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, color: "#fff", margin: "0 auto 12px" }}>آ</div>
          <div style={{ fontWeight: 800, fontSize: 18, color: "#8b4e6b" }}>آشنا پرفیوم</div>
          <div style={{ fontSize: 12, color: "#aaa", marginTop: 4 }}>ورود به پنل مدیریت</div>
        </div>

        <div style={{ marginBottom: 14 }}>
          <Label>نام کاربری</Label>
          <input
            value={username}
            onChange={(e) => { setUsername(e.target.value); setError(""); }}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="admin"
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <Label>رمز عبور</Label>
          <div style={{ position: "relative" }}>
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="••••••••"
              style={{ ...inputStyle, paddingLeft: 40 }}
            />
            <button
              onClick={() => setShowPass(!showPass)}
              type="button"
              style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#aaa", fontSize: 14 }}
            >
              {showPass ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        {error && (
          <div style={{ background: "#fce8e8", color: "#c0392b", padding: "8px 12px", borderRadius: 8, fontSize: 13, marginBottom: 14, textAlign: "center" }}>
            {error}
          </div>
        )}

        <button
          onClick={handleLogin}
          style={{ width: "100%", background: "linear-gradient(135deg, #c96b8a, #8b4e6b)", color: "#fff", border: "none", borderRadius: 10, padding: "12px", fontWeight: 700, cursor: "pointer", fontSize: 15 }}
        >
          ورود
        </button>
      </div>
    </div>
  );
}

const CATEGORIES = [
  { value: "perfume", label: "عطر و ادکلن" },
  { value: "skincare", label: "مراقبت از پوست" },
  { value: "makeup", label: "آرایش صورت" },
  { value: "lips", label: "آرایش لب" },
  { value: "hair", label: "مراقبت از مو" },
  { value: "body", label: "بدن و حمام" },
];

const BRANDS = [
  "آشنا پرفیوم", "لومیه", "پاریس بل", "اسکین لب", "رزا", "نیووآ", "بل‌فام", "اوریفلیم",
];

type ProductRow = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  discountPrice: number | null;
  stock: number;
  description: string;
  badge: string;
  image: string;
};

const INITIAL_PRODUCTS: ProductRow[] = [
  { id: "pink-rose-cream", name: "کرم آبرسان رز صورتی", brand: "آشنا پرفیوم", category: "skincare", price: 720000, discountPrice: 580000, stock: 15, description: "کرم آبرسان با عصاره گل رز برای پوست‌های خشک و نیمه خشک", badge: "پرفروش", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop" },
  { id: "matte-lipstick-velvet", name: "رژ لب مات ولوت", brand: "لومیه", category: "lips", price: 390000, discountPrice: 320000, stock: 28, description: "رژ لب مات با ماندگاری بالا و بافت مخملی", badge: "تخفیف", image: "https://images.unsplash.com/photo-1586495777744-4e6232bf2b4e?w=300&h=300&fit=crop" },
  { id: "rose-perfume", name: "عطر زنانه رز فرنچ", brand: "پاریس بل", category: "perfume", price: 1450000, discountPrice: null, stock: 8, description: "عطر زنانه با رایحه گل رز فرانسوی، ماندگاری بالا", badge: "ویژه", image: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=300&h=300&fit=crop" },
  { id: "vitamin-c-serum", name: "سرم ویتامین C درخشان‌کننده", brand: "اسکین لب", category: "skincare", price: 850000, discountPrice: 690000, stock: 20, description: "سرم ویتامین C برای روشن‌سازی و یکنواخت کردن رنگ پوست", badge: "جدید", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&h=300&fit=crop" },
  { id: "body-mist-pink", name: "بادی اسپلش صورتی", brand: "آشنا پرفیوم", category: "body", price: 350000, discountPrice: 280000, stock: 35, description: "اسپری بدن با رایحه گل‌های بهاری، مناسب استفاده روزانه", badge: "تخفیف", image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=300&h=300&fit=crop" },
];

type FormState = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: string;
  discountPrice: string;
  stock: string;
  description: string;
  badge: string;
  image: string;
};

const EMPTY_FORM: FormState = {
  id: "",
  name: "",
  brand: BRANDS[0],
  category: "perfume",
  price: "",
  discountPrice: "",
  stock: "",
  description: "",
  badge: "",
  image: "",
};

function formatPrice(p: number | null | undefined) {
  if (!p) return "—";
  return Number(p).toLocaleString("fa-IR") + " تومان";
}

function getCategoryLabel(val: string) {
  return CATEGORIES.find((c) => c.value === val)?.label || val;
}

function AdminPanel() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [products, setProducts] = useState<ProductRow[]>(INITIAL_PRODUCTS);
  const [view, setView] = useState<"list" | "form" | "delete">("list");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("all");
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  function showToast(msg: string, type: "success" | "error" = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2800);
  }

  function openAdd() {
    setForm({ ...EMPTY_FORM, id: "product-" + Date.now() });
    setEditingId(null);
    setView("form");
  }

  function openEdit(p: ProductRow) {
    setForm({
      ...p,
      price: String(p.price),
      discountPrice: p.discountPrice ? String(p.discountPrice) : "",
      stock: String(p.stock),
    });
    setEditingId(p.id);
    setView("form");
  }

  function openDelete(id: string) {
    setDeleteId(id);
    setView("delete");
  }

  function handleSave() {
    if (!form.name || !form.price || !form.stock) {
      showToast("لطفاً نام، قیمت و موجودی را وارد کنید.", "error");
      return;
    }
    const saved: ProductRow = {
      id: form.id,
      name: form.name,
      brand: form.brand,
      category: form.category,
      description: form.description,
      badge: form.badge,
      image: form.image,
      price: Number(form.price),
      discountPrice: form.discountPrice ? Number(form.discountPrice) : null,
      stock: Number(form.stock),
    };
    if (editingId) {
      setProducts((prev) => prev.map((p) => (p.id === editingId ? saved : p)));
      showToast("محصول با موفقیت ویرایش شد ✓");
    } else {
      setProducts((prev) => [saved, ...prev]);
      showToast("محصول جدید اضافه شد ✓");
    }
    setView("list");
  }

  function handleDelete() {
    setProducts((prev) => prev.filter((p) => p.id !== deleteId));
    showToast("محصول حذف شد.", "error");
    setView("list");
    setDeleteId(null);
  }

  const filtered = products.filter((p) => {
    const matchSearch = p.name.includes(search) || p.brand.includes(search);
    const matchCat = filterCat === "all" || p.category === filterCat;
    return matchSearch && matchCat;
  });

  const totalStock = products.reduce((s, p) => s + p.stock, 0);
  const lowStock = products.filter((p) => p.stock < 10).length;

  if (!loggedIn) return <LoginScreen onLogin={() => setLoggedIn(true)} />;

  return (
    <div dir="rtl" style={{ fontFamily: "'Vazirmatn', Tahoma, sans-serif", minHeight: "100vh", background: "#fdf6f9", color: "#1a1a2e" }}>
      <div style={{ background: "linear-gradient(135deg, #c96b8a 0%, #8b4e6b 100%)", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 2px 12px rgba(140,60,90,0.15)", flexWrap: "wrap", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, background: "rgba(255,255,255,0.2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: "#fff" }}>آ</div>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>آشنا پرفیوم</div>
            <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 11 }}>پنل مدیریت محصولات</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {view === "list" && (
            <button onClick={openAdd} style={{ background: "#fff", color: "#c96b8a", border: "none", borderRadius: 8, padding: "8px 18px", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>
              + افزودن محصول
            </button>
          )}
          {view !== "list" && (
            <button onClick={() => setView("list")} style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: 13 }}>
              ← بازگشت
            </button>
          )}
          <button onClick={() => setLoggedIn(false)} style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, padding: "7px 14px", cursor: "pointer", fontSize: 12 }}>
            خروج
          </button>
        </div>
      </div>

      {toast && (
        <div style={{ position: "fixed", top: 72, right: 24, background: toast.type === "error" ? "#e53e3e" : "#38a169", color: "#fff", padding: "10px 20px", borderRadius: 8, zIndex: 999, fontSize: 13, boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}>
          {toast.msg}
        </div>
      )}

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "24px 16px" }}>
        {view === "list" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
              {[
                { label: "کل محصولات", value: String(products.length), color: "#c96b8a" },
                { label: "موجودی کل", value: totalStock + " عدد", color: "#6b8bc9" },
                { label: "موجودی کم", value: lowStock + " محصول", color: lowStock > 0 ? "#e07a3a" : "#38a169" },
              ].map((s) => (
                <div key={s.label} style={{ background: "#fff", borderRadius: 12, padding: "14px 16px", boxShadow: "0 1px 6px rgba(0,0,0,0.06)", borderTop: `3px solid ${s.color}` }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
              <input
                placeholder="جستجو در نام یا برند..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ flex: 1, minWidth: 180, padding: "9px 14px", borderRadius: 8, border: "1px solid #e8d5df", fontSize: 13, background: "#fff", outline: "none" }}
              />
              <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)} style={{ padding: "9px 14px", borderRadius: 8, border: "1px solid #e8d5df", fontSize: 13, background: "#fff", cursor: "pointer" }}>
                <option value="all">همه دسته‌ها</option>
                {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {filtered.length === 0 && (
                <div style={{ textAlign: "center", color: "#aaa", padding: 40, background: "#fff", borderRadius: 12 }}>محصولی یافت نشد</div>
              )}
              {filtered.map((p) => (
                <div key={p.id} style={{ background: "#fff", borderRadius: 12, padding: "14px 16px", boxShadow: "0 1px 6px rgba(0,0,0,0.06)", display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                  <img src={p.image || "https://via.placeholder.com/60"} alt={p.name} style={{ width: 60, height: 60, borderRadius: 8, objectFit: "cover", flexShrink: 0, border: "1px solid #f0dce6" }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                      <span style={{ fontWeight: 700, fontSize: 14 }}>{p.name}</span>
                      {p.badge && <span style={{ background: "#fce4ec", color: "#c96b8a", fontSize: 10, padding: "2px 7px", borderRadius: 20, fontWeight: 600 }}>{p.badge}</span>}
                    </div>
                    <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{p.brand} • {getCategoryLabel(p.category)}</div>
                    <div style={{ display: "flex", gap: 12, marginTop: 4, fontSize: 12, flexWrap: "wrap" }}>
                      <span style={{ color: p.discountPrice ? "#999" : "#c96b8a", textDecoration: p.discountPrice ? "line-through" : "none" }}>{formatPrice(p.price)}</span>
                      {p.discountPrice && <span style={{ color: "#c96b8a", fontWeight: 700 }}>{formatPrice(p.discountPrice)}</span>}
                      <span style={{ color: p.stock < 10 ? "#e07a3a" : "#38a169" }}>موجودی: {p.stock}</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                    <button onClick={() => openEdit(p)} style={{ background: "#f0e9f5", color: "#8b4e6b", border: "none", borderRadius: 7, padding: "7px 14px", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>ویرایش</button>
                    <button onClick={() => openDelete(p.id)} style={{ background: "#fce8e8", color: "#c0392b", border: "none", borderRadius: 7, padding: "7px 14px", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>حذف</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {view === "form" && (
          <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
            <h2 style={{ margin: "0 0 20px", fontSize: 17, color: "#8b4e6b" }}>{editingId ? "ویرایش محصول" : "افزودن محصول جدید"}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div style={{ gridColumn: "1 / -1" }}>
                <Label>نام محصول *</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="مثلاً: عطر زنانه رز فرنچ" />
              </div>
              <div>
                <Label>برند *</Label>
                <select value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} style={selectStyle}>
                  {BRANDS.map((b) => <option key={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <Label>دسته‌بندی *</Label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} style={selectStyle}>
                  {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
              <div>
                <Label>قیمت (تومان) *</Label>
                <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="مثلاً: 1450000" />
              </div>
              <div>
                <Label>قیمت با تخفیف (تومان)</Label>
                <Input type="number" value={form.discountPrice} onChange={(e) => setForm({ ...form, discountPrice: e.target.value })} placeholder="اختیاری" />
              </div>
              <div>
                <Label>موجودی *</Label>
                <Input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} placeholder="تعداد" />
              </div>
              <div>
                <Label>برچسب</Label>
                <select value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} style={selectStyle}>
                  <option value="">بدون برچسب</option>
                  {["پرفروش", "جدید", "تخفیف", "ویژه"].map((b) => <option key={b}>{b}</option>)}
                </select>
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <Label>لینک تصویر</Label>
                <Input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://..." />
              </div>
              {form.image && (
                <div style={{ gridColumn: "1 / -1" }}>
                  <img src={form.image} alt="پیش‌نمایش" style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 8, border: "1px solid #f0dce6" }} onError={(e) => ((e.target as HTMLImageElement).style.display = "none")} />
                </div>
              )}
              <div style={{ gridColumn: "1 / -1" }}>
                <Label>توضیحات</Label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="توضیح کوتاه درباره محصول..." rows={3} style={{ ...inputStyle, resize: "vertical" }} />
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button onClick={handleSave} style={{ background: "linear-gradient(135deg, #c96b8a, #8b4e6b)", color: "#fff", border: "none", borderRadius: 8, padding: "10px 28px", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
                {editingId ? "ذخیره تغییرات" : "افزودن محصول"}
              </button>
              <button onClick={() => setView("list")} style={{ background: "#f5f5f5", color: "#555", border: "none", borderRadius: 8, padding: "10px 20px", cursor: "pointer", fontSize: 14 }}>
                انصراف
              </button>
            </div>
          </div>
        )}

        {view === "delete" && (
          <div style={{ background: "#fff", borderRadius: 16, padding: 32, textAlign: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", maxWidth: 400, margin: "40px auto" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🗑️</div>
            <h3 style={{ margin: "0 0 8px", color: "#c0392b" }}>حذف محصول</h3>
            <p style={{ color: "#666", fontSize: 14, marginBottom: 24 }}>آیا مطمئن هستید؟ این عملیات قابل بازگشت نیست.</p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button onClick={handleDelete} style={{ background: "#e53e3e", color: "#fff", border: "none", borderRadius: 8, padding: "10px 24px", fontWeight: 700, cursor: "pointer" }}>بله، حذف شود</button>
              <button onClick={() => setView("list")} style={{ background: "#f5f5f5", color: "#555", border: "none", borderRadius: 8, padding: "10px 20px", cursor: "pointer" }}>انصراف</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}