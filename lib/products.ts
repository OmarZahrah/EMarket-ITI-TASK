import { findAllProducts, findProductById } from "@/lib/product-store";
import type { Product } from "@/types/product";

export async function getProducts(): Promise<Product[]> {
  try {
    return await findAllProducts();
  } catch {
    return [];
  }
}

export async function getProduct(id: string): Promise<Product | null> {
  const parsedId = Number(id);
  if (!Number.isInteger(parsedId) || parsedId <= 0) return null;

  try {
    return await findProductById(parsedId);
  } catch {
    return null;
  }
}

export async function getProductIds(): Promise<{ id: string }[]> {
  const products = await getProducts();
  return products.map((p) => ({ id: String(p.id) }));
}
