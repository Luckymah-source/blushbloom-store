import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  fetchAllBrandsAdmin,
  createBrand,
  updateBrand,
  deleteBrand,
  type DBBrand,
  type BrandInput,
} from "@/lib/brands-api";

function slugify(s: string) {
  return s.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-_\u0600-\u06FF]/g, "");
}

const EMPTY: BrandInput & { id?: string } = {
  slug: "",
  name: "",
  description: "",
  logo: "",
  is_active: true,
};

const inputCls = "w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary";

export function AdminBrands() {
  const qc = useQueryClient();
  const [view, setView] = useState<"list" | "form" | "delete">("list");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState<BrandInput>({ ...EMPTY });

  const { data: brands = [], isLoading } = useQuery({
    queryKey: ["admin-brands"],
    queryFn: fetchAllBrandsAdmin,
  });

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["admin-brands"] });
    qc.invalidateQueries({ queryKey: ["brands"] });
  };

  const createMut = useMutation({
    mutationFn: createBrand,
    onSuccess: () => { invalidate(); toast.success("برند جدید اضافه شد ✓"); setView("list"); },
    onError: (e: Error) => toast.error("خطا در افزودن: " + e.message),
  });
  const updateMut = useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<BrandInput> }) => updateBrand(id, input),
    onSuccess: () => { invalidate(); toast.success("برند ویرایش شد ✓"); setView("list"); },
    onError: (e: Error) => toast.error("خطا در ویرایش: " + e.message),
  });
  const deleteMut = useMutation({
    mutationFn: deleteBrand,
    onSuccess: () => { invalidate(); toast.success("برند حذف شد"); setView("list"); setDeleteId(null); },
    onError: (e: Error) => toast.error("خطا در حذف: " + e.message),
  });

  function openAdd() {
    setForm({ ...EMPTY });
    setEditingId(null);
    setView("form");
  }
  function openEdit(b: DBBrand) {
    setForm({
      slug: b.slug,
      name: b.name,
      description: b.description || "",
      logo: b.logo || "",
      is_active: b.is_active,
    });
    setEditingId(b.id);
    setView("form");
  }
  function handleSave() {
    if (!form.name) {
      toast.error("نام برند الزامی است.");
      return;
    }
    const slug = form.slug || slugify(form.name) || "brand-" + Date.now();
    const input: BrandInput = {
      slug,
      name: form.name,
      description: form.description || null,
      logo: form.logo || null,
      is_active: form.is_active,
    };
    if (editingId) updateMut.mutate({ id: editingId, input });
    else createMut.mutate(input);
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-black">مدیریت برندها</h2>
        {view === "list" && (
          <button onClick={openAdd} className="bg-primary text-primary-foreground rounded-xl px-4 py-2 text-sm font-bold hover:opacity-90">+ افزودن برند</button>
        )}
        {view !== "list" && (
          <button onClick={() => setView("list")} className="bg-secondary text-secondary-foreground rounded-xl px-4 py-2 text-sm hover:opacity-80">← بازگشت به لیست</button>
        )}
      </div>

      {view === "list" && (
        isLoading ? (
          <div className="text-center py-12 text-muted-foreground">در حال بارگذاری برندها...</div>
        ) : brands.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-2xl text-muted-foreground">برندی یافت نشد</div>
        ) : (
          <div className="space-y-2">
            {brands.map((b) => (
              <div key={b.id} className="bg-card rounded-2xl border border-border p-3 flex items-center gap-3 flex-wrap">
                {b.logo ? (
                  <img src={b.logo} alt={b.name} className="w-12 h-12 rounded-xl object-contain border border-border bg-white shrink-0" />
                ) : (
                  <div className="w-12 h-12 rounded-xl border border-border bg-rose-soft/40 grid place-items-center text-primary font-black shrink-0">
                    {b.name.charAt(0)}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-sm">{b.name}</span>
                    {!b.is_active && <span className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full">غیرفعال</span>}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5" dir="ltr">{b.slug}</div>
                  {b.description && <div className="text-xs text-muted-foreground mt-1 line-clamp-1">{b.description}</div>}
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => openEdit(b)} className="bg-secondary text-secondary-foreground rounded-lg px-3 py-1.5 text-xs font-bold hover:opacity-80">ویرایش</button>
                  <button onClick={() => { setDeleteId(b.id); setView("delete"); }} className="bg-destructive/10 text-destructive rounded-lg px-3 py-1.5 text-xs font-bold hover:bg-destructive/20">حذف</button>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {view === "form" && (
        <div className="bg-card rounded-3xl border border-border p-6 max-w-2xl mx-auto">
          <h3 className="text-base font-black text-primary mb-5">{editingId ? "ویرایش برند" : "افزودن برند جدید"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-muted-foreground mb-1.5">نام برند *</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} placeholder="مثلاً: شنل" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-muted-foreground mb-1.5">اسلاگ (URL)</label>
              <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className={inputCls} dir="ltr" placeholder="chanel (اختیاری — خودکار ساخته می‌شود)" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-muted-foreground mb-1.5">لینک لوگو</label>
              <input value={form.logo ?? ""} onChange={(e) => setForm({ ...form, logo: e.target.value })} className={inputCls} dir="ltr" placeholder="https://..." />
            </div>
            {form.logo && (
              <div className="md:col-span-2">
                <img src={form.logo} alt="پیش‌نمایش" className="w-20 h-20 rounded-xl object-contain border border-border bg-white" onError={(e) => ((e.target as HTMLImageElement).style.display = "none")} />
              </div>
            )}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-muted-foreground mb-1.5">توضیحات</label>
              <textarea rows={3} value={form.description ?? ""} onChange={(e) => setForm({ ...form, description: e.target.value })} className={inputCls} placeholder="توضیح کوتاه درباره برند..." />
            </div>
            <div className="md:col-span-2">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} className="w-4 h-4" />
                برند فعال (در سایت و فرم محصول نمایش داده شود)
              </label>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={handleSave} disabled={createMut.isPending || updateMut.isPending}
              className="bg-primary text-primary-foreground rounded-xl px-6 py-2.5 text-sm font-bold hover:opacity-90 disabled:opacity-60">
              {createMut.isPending || updateMut.isPending ? "در حال ذخیره..." : editingId ? "ذخیره تغییرات" : "افزودن برند"}
            </button>
            <button onClick={() => setView("list")} className="bg-secondary text-secondary-foreground rounded-xl px-5 py-2.5 text-sm hover:opacity-80">انصراف</button>
          </div>
        </div>
      )}

      {view === "delete" && (
        <div className="bg-card rounded-3xl border border-border p-8 max-w-md mx-auto mt-12 text-center">
          <div className="text-5xl mb-3">🗑️</div>
          <h3 className="text-lg font-black text-destructive mb-2">حذف برند</h3>
          <p className="text-sm text-muted-foreground mb-6">آیا مطمئن هستید؟ توجه: اگر محصولی به این برند مرتبط باشد، نام برند روی محصول باقی می‌ماند.</p>
          <div className="flex gap-2 justify-center">
            <button onClick={() => deleteId && deleteMut.mutate(deleteId)} disabled={deleteMut.isPending}
              className="bg-destructive text-destructive-foreground rounded-xl px-5 py-2.5 text-sm font-bold hover:opacity-90 disabled:opacity-60">
              {deleteMut.isPending ? "..." : "بله، حذف شود"}
            </button>
            <button onClick={() => setView("list")} className="bg-secondary text-secondary-foreground rounded-xl px-5 py-2.5 text-sm">انصراف</button>
          </div>
        </div>
      )}
    </>
  );
}
