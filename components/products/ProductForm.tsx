"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import type { Product } from "@/types/product";

const MAX_FILE_BYTES = 2 * 1024 * 1024;

type Props = {
  initial: Product | null;
  onCancel: () => void;
  onSave: (payload: {
    id?: number;
    images: string[];
    title: string;
    desc: string;
    price: number;
    discountPercentage: number;
    category: string;
    stock: number;
  }) => Promise<void>;
};

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const r = reader.result;
      if (typeof r === "string") resolve(r);
      else reject(new Error("Invalid read"));
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export function ProductForm({ initial, onCancel, onSave }: Props) {
  const [images, setImages] = useState<string[]>(() => initial?.images ?? []);
  const [title, setTitle] = useState(() => initial?.title ?? "");
  const [desc, setDesc] = useState(() => initial?.desc ?? "");
  const [price, setPrice] = useState(() =>
    initial != null ? String(initial.price) : "",
  );
  const [discountPercentage, setDiscountPercentage] = useState(() =>
    initial != null ? String(initial.discountPercentage) : "",
  );
  const [category, setCategory] = useState(() => initial?.category ?? "");
  const [stock, setStock] = useState(() =>
    initial != null ? String(initial.stock) : "",
  );
  const [saving, setSaving] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  const onFiles = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files?.length) return;
      setFileError(null);
      const next: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith("image/")) {
          setFileError("Please choose image files only.");
          continue;
        }
        if (file.size > MAX_FILE_BYTES) {
          setFileError(`Each image must be under ${MAX_FILE_BYTES / 1024 / 1024}MB.`);
          continue;
        }
        try {
          next.push(await readFileAsDataUrl(file));
        } catch {
          setFileError("Could not read one of the files.");
        }
      }
      if (next.length) setImages((prev) => [...prev, ...next]);
      e.target.value = "";
    },
    [],
  );

  function removeImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const priceNum = Number(price);
    const discountNum = Number(discountPercentage);
    const stockNum = Number(stock);
    if (!title.trim() || Number.isNaN(priceNum) || Number.isNaN(stockNum)) {
      return;
    }
    if (images.length === 0) {
      setFileError("Add at least one image from your device.");
      return;
    }
    setSaving(true);
    try {
      await onSave({
        id: initial?.id,
        images,
        title: title.trim(),
        desc: desc.trim(),
        price: priceNum,
        discountPercentage: Number.isNaN(discountNum) ? 0 : discountNum,
        category: category.trim() || "General",
        stock: stockNum,
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <span className="text-sm font-medium text-slate-800">Images</span>
        <p className="mt-0.5 text-xs text-slate-600">
          Upload photos from your device. They are saved directly with the
          product in JSON Server.
        </p>
        <label className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/80 px-4 py-8 transition hover:border-blue-300 hover:bg-blue-50/50">
          <input
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            onChange={onFiles}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="mt-2 text-sm font-medium text-slate-700">
            Click to upload or drop images
          </span>
          <span className="mt-1 text-xs text-slate-500">PNG, JPG, WebP — max 2MB each</span>
        </label>
        {fileError && (
          <p className="mt-2 text-sm text-rose-600" role="alert">
            {fileError}
          </p>
        )}
        {images.length > 0 && (
          <ul className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
            {images.map((src, index) => (
              <li
                key={`${index}-${src.slice(0, 24)}`}
                className="relative aspect-square overflow-hidden rounded-lg border border-slate-200 bg-slate-100"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="120px"
                  unoptimized={src.startsWith("data:")}
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-rose-50 hover:text-rose-700"
                  aria-label="Remove image"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-slate-800">Title</span>
        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-slate-800">Description</span>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          rows={3}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
      </label>
      <div className="grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-slate-800">Price</span>
          <input
            required
            type="number"
            min={0}
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-slate-800">Discount %</span>
          <input
            type="number"
            min={0}
            max={100}
            value={discountPercentage}
            onChange={(e) => setDiscountPercentage(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </label>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-slate-800">Category</span>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-slate-800">Stock</span>
          <input
            required
            type="number"
            min={0}
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </label>
      </div>
      <div className="mt-2 flex justify-end gap-2 border-t border-slate-100 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 shadow-sm transition hover:bg-slate-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save"}
        </button>
      </div>
    </form>
  );
}
