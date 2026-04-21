import type { NextApiRequest, NextApiResponse } from "next";
import { createProduct, findAllProducts } from "@/lib/product-store";

type ProductInput = {
  images: string[];
  title: string;
  desc: string;
  price: number;
  discountPercentage: number;
  category: string;
  stock: number;
};

function parseProductInput(body: unknown): ProductInput | null {
  if (!body || typeof body !== "object") return null;
  const raw = body as Record<string, unknown>;

  if (
    !Array.isArray(raw.images) ||
    typeof raw.title !== "string" ||
    typeof raw.desc !== "string" ||
    typeof raw.price !== "number" ||
    typeof raw.discountPercentage !== "number" ||
    typeof raw.category !== "string" ||
    typeof raw.stock !== "number"
  ) {
    return null;
  }

  return {
    images: raw.images.filter((img): img is string => typeof img === "string"),
    title: raw.title,
    desc: raw.desc,
    price: raw.price,
    discountPercentage: raw.discountPercentage,
    category: raw.category,
    stock: raw.stock,
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const products = await findAllProducts();
    return res.status(200).json(products);
  }

  if (req.method === "POST") {
    const payload = parseProductInput(req.body);
    if (!payload) {
      return res.status(400).json({ message: "Invalid request payload." });
    }

    const created = await createProduct(payload);
    return res.status(201).json(created);
  }

  return res.status(405).json({ message: "Method not allowed." });
}
