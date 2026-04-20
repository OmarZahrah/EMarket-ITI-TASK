import { getApiUrl } from "@/lib/api";
import type { Product } from "@/types/product";

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${getApiUrl()}/products`, { cache: "force-cache" });
  if (!res.ok) return [];
  return res.json();
}

export async function getProduct(id: string): Promise<Product | null> {
  const res = await fetch(`${getApiUrl()}/products/${id}`, {
    cache: "force-cache",
  });
  if (!res.ok) return null;
  return res.json();
}

export async function getProductIds(): Promise<{ id: string }[]> {
  const products = await getProducts();
  return products.map((p) => ({ id: String(p.id) }));
}
