"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/types/product";
import { getApiUrl } from "@/lib/api";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductModal } from "@/components/products/ProductModal";

type Props = {
  initialProducts: Product[];
};

const pillActive =
  "bg-blue-600 text-white shadow-sm ring-1 ring-blue-600/20";
const pillInactive =
  "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50";

export function ProductsClient({ initialProducts }: Props) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [category, setCategory] = useState<string>("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category).filter(Boolean));
    return Array.from(set).sort();
  }, [products]);

  const filtered = useMemo(() => {
    if (category === "All") return products;
    return products.filter((p) => p.category === category);
  }, [products, category]);

  function openAdd() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(product: Product) {
    setEditing(product);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditing(null);
  }

  async function handleSave(payload: {
    id?: number;
    images: string[];
    title: string;
    desc: string;
    price: number;
    discountPercentage: number;
    category: string;
    stock: number;
  }) {
    const base = getApiUrl();
    const body = {
      images: payload.images,
      title: payload.title,
      desc: payload.desc,
      price: payload.price,
      discountPercentage: payload.discountPercentage,
      category: payload.category,
      stock: payload.stock,
    };
    if (payload.id != null) {
      const res = await fetch(`${base}/products/${payload.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Failed to update");
      const updated = (await res.json()) as Product;
      setProducts((prev) =>
        prev.map((p) => (p.id === updated.id ? { ...p, ...updated } : p)),
      );
    } else {
      const res = await fetch(`${base}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Failed to create");
      const created = (await res.json()) as Product;
      setProducts((prev) => [created, ...prev]);
    }
    closeModal();
  }

  async function handleDelete(product: Product) {
    if (!window.confirm(`Delete “${product.title}”?`)) return;
    const res = await fetch(`${getApiUrl()}/products/${product.id}`, {
      method: "DELETE",
    });
    if (!res.ok) return;
    setProducts((prev) => prev.filter((p) => p.id !== product.id));
  }

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-600">Catalog</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
              Shop all products
            </h1>
            <p className="mt-2 max-w-xl text-slate-600">
              Filter by category, or use{" "}
              <span className="font-medium text-slate-700">Add product</span>{" "}
              to update the catalog.
            </p>
          </div>
          <button
            type="button"
            onClick={openAdd}
            className="inline-flex items-center justify-center self-start rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 lg:self-auto"
          >
            + Add product
          </button>
        </div>

        <div className="mt-8 border-t border-slate-100 pt-6">
          <p className="text-sm text-slate-600">
            <span className="font-semibold text-slate-900">
              {filtered.length}
            </span>{" "}
            {filtered.length === 1 ? "item" : "items"}
            {category !== "All" && (
              <span className="text-slate-600"> in {category}</span>
            )}
          </p>
        </div>

        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Category
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setCategory("All")}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                category === "All" ? pillActive : pillInactive
              }`}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                  category === c ? pillActive : pillInactive
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-slate-600">
          No products in this category.
        </p>
      ) : (
        <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((product) => (
            <li key={product.id}>
              <ProductCard
                product={product}
                onEdit={openEdit}
                onDelete={handleDelete}
              />
            </li>
          ))}
        </ul>
      )}

      <ProductModal
        open={modalOpen}
        editing={editing}
        onClose={closeModal}
        onSave={handleSave}
      />
    </>
  );
}
