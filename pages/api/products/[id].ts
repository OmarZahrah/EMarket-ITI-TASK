import type { NextApiRequest, NextApiResponse } from "next";
import {
  deleteProduct,
  findProductById,
  updateProduct,
} from "@/lib/product-store";

type ProductUpdateInput = {
  images?: string[];
  title?: string;
  desc?: string;
  price?: number;
  discountPercentage?: number;
  category?: string;
  stock?: number;
};

function parseId(idParam: string | string[] | undefined): number | null {
  if (typeof idParam !== "string") return null;
  const id = Number(idParam);
  return Number.isInteger(id) && id > 0 ? id : null;
}

function parseUpdateInput(body: unknown): ProductUpdateInput | null {
  if (!body || typeof body !== "object") return null;
  const raw = body as Record<string, unknown>;
  const payload: ProductUpdateInput = {};

  if ("images" in raw) {
    if (!Array.isArray(raw.images)) return null;
    payload.images = raw.images.filter(
      (image): image is string => typeof image === "string",
    );
  }
  if ("title" in raw) {
    if (typeof raw.title !== "string") return null;
    payload.title = raw.title;
  }
  if ("desc" in raw) {
    if (typeof raw.desc !== "string") return null;
    payload.desc = raw.desc;
  }
  if ("price" in raw) {
    if (typeof raw.price !== "number") return null;
    payload.price = raw.price;
  }
  if ("discountPercentage" in raw) {
    if (typeof raw.discountPercentage !== "number") return null;
    payload.discountPercentage = raw.discountPercentage;
  }
  if ("category" in raw) {
    if (typeof raw.category !== "string") return null;
    payload.category = raw.category;
  }
  if ("stock" in raw) {
    if (typeof raw.stock !== "number") return null;
    payload.stock = raw.stock;
  }

  return payload;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const id = parseId(req.query.id);
  if (!id) {
    return res.status(400).json({ message: "Invalid product id." });
  }

  if (req.method === "GET") {
    const product = await findProductById(id);
    if (!product) return res.status(404).json({ message: "Product not found." });
    return res.status(200).json(product);
  }

  if (req.method === "PATCH") {
    const payload = parseUpdateInput(req.body);
    if (!payload) {
      return res.status(400).json({ message: "Invalid request payload." });
    }

    const updated = await updateProduct(id, payload);
    if (!updated) return res.status(404).json({ message: "Product not found." });
    return res.status(200).json(updated);
  }

  if (req.method === "DELETE") {
    const removed = await deleteProduct(id);
    if (!removed) return res.status(404).json({ message: "Product not found." });
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ message: "Method not allowed." });
}
