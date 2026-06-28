import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import type { Product } from "@/lib/mock-data";

export type DBProduct = Database["public"]["Tables"]["products"]["Row"];

const FALLBACK_IMG = "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop";

export function dbToCardProduct(p: DBProduct): Product {
  const hasDiscount = p.discount_price != null && p.discount_price < p.price;
  return {
    id: p.id,
    slug: p.slug,
    title: p.name,
    brand: p.brand,
    category: p.category,
    price: hasDiscount ? Number(p.discount_price) : Number(p.price),
    oldPrice: hasDiscount ? Number(p.price) : undefined,
    rating: 4.7,
    reviews: 0,
    sold: 0,
    image: p.image || FALLBACK_IMG,
    badge: p.badge || undefined,
  };
}

export async function fetchActiveProducts(limit = 50) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data ?? [];
}

export async function fetchAllProductsAdmin() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export type ProductInput = {
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  discount_price: number | null;
  stock: number;
  description: string | null;
  badge: string | null;
  image: string | null;
  is_active: boolean;
};

export async function createProduct(input: ProductInput) {
  const { data, error } = await supabase.from("products").insert(input).select().single();
  if (error) throw error;
  return data;
}

export async function updateProduct(id: string, input: Partial<ProductInput>) {
  const { data, error } = await supabase.from("products").update(input).eq("id", id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteProduct(id: string) {
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
}

export async function checkIsAdmin(userId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  if (error) return false;
  return !!data;
}