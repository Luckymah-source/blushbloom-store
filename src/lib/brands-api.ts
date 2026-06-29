import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type DBBrand = Database["public"]["Tables"]["brands"]["Row"];

export type BrandInput = {
  slug: string;
  name: string;
  description: string | null;
  logo: string | null;
  is_active: boolean;
};

export async function fetchAllBrandsAdmin(): Promise<DBBrand[]> {
  const { data, error } = await supabase
    .from("brands")
    .select("*")
    .order("name", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function fetchActiveBrands(): Promise<DBBrand[]> {
  const { data, error } = await supabase
    .from("brands")
    .select("*")
    .eq("is_active", true)
    .order("name", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function createBrand(input: BrandInput) {
  const { data, error } = await supabase.from("brands").insert(input).select().single();
  if (error) throw error;
  return data;
}

export async function updateBrand(id: string, input: Partial<BrandInput>) {
  const { data, error } = await supabase.from("brands").update(input).eq("id", id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteBrand(id: string) {
  const { error } = await supabase.from("brands").delete().eq("id", id);
  if (error) throw error;
}
