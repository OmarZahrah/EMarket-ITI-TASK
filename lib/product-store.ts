import type { OptionalId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import type { Product } from "@/types/product";

type ProductDocument = Product & {
  _id?: unknown;
};

const DB_NAME = process.env.MONGODB_DB_NAME ?? "emarket";
const COLLECTION_NAME = "products";

async function getCollection() {
  const client = await clientPromise;
  return client.db(DB_NAME).collection<ProductDocument>(COLLECTION_NAME);
}

function normalizeProduct(doc: ProductDocument): Product {
  return {
    id: Number(doc.id),
    images: Array.isArray(doc.images) ? doc.images : [],
    title: doc.title ?? "",
    desc: doc.desc ?? "",
    price: Number(doc.price ?? 0),
    discountPercentage: Number(doc.discountPercentage ?? 0),
    category: doc.category ?? "",
    stock: Number(doc.stock ?? 0),
  };
}

export async function findAllProducts(): Promise<Product[]> {
  const collection = await getCollection();
  const docs = await collection.find().sort({ id: -1 }).toArray();
  return docs.map(normalizeProduct);
}

export async function findProductById(id: number): Promise<Product | null> {
  const collection = await getCollection();
  const doc = await collection.findOne({ id });
  return doc ? normalizeProduct(doc) : null;
}

export async function createProduct(
  payload: Omit<Product, "id">,
): Promise<Product> {
  const collection = await getCollection();

  const maxProduct = await collection.find().sort({ id: -1 }).limit(1).next();
  const nextId = maxProduct ? maxProduct.id + 1 : 1;

  const doc: OptionalId<ProductDocument> = {
    ...payload,
    id: nextId,
  };

  await collection.insertOne(doc);
  return normalizeProduct(doc);
}

export async function updateProduct(
  id: number,
  payload: Partial<Omit<Product, "id">>,
): Promise<Product | null> {
  const collection = await getCollection();
  await collection.updateOne({ id }, { $set: payload });
  const updated = await collection.findOne({ id });
  return updated ? normalizeProduct(updated) : null;
}

export async function deleteProduct(id: number): Promise<boolean> {
  const collection = await getCollection();
  const result = await collection.deleteOne({ id });
  return result.deletedCount > 0;
}
