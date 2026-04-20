"use client";

import type { Product } from "@/types/product";
import { ProductForm } from "@/components/products/ProductForm";

type SavePayload = {
  id?: number;
  images: string[];
  title: string;
  desc: string;
  price: number;
  discountPercentage: number;
  category: string;
  stock: number;
};

type Props = {
  open: boolean;
  editing: Product | null;
  onClose: () => void;
  onSave: (payload: SavePayload) => Promise<void>;
};

export function ProductModal({ open, editing, onClose, onSave }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-slate-600/35 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div className="relative z-10 max-h-[min(90vh,720px)] w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/10">
        <h2 className="mb-1 text-lg font-semibold text-slate-900">
          {editing ? "Edit product" : "Add product"}
        </h2>
        <p className="mb-4 text-sm text-slate-600">
          {editing
            ? "Update details and images. New uploads are added to the gallery."
            : "Upload images from your device and fill in the details below."}
        </p>
        <ProductForm
          key={editing ? String(editing.id) : "new"}
          initial={editing}
          onCancel={onClose}
          onSave={onSave}
        />
      </div>
    </div>
  );
}
