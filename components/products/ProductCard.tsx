"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { priceAfterDiscount } from "@/lib/price";

type Props = {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
};

export function ProductCard({ product, onEdit, onDelete }: Props) {
  const img = product.images[0];
  const finalPrice = priceAfterDiscount(
    product.price,
    product.discountPercentage,
  );
  const hasDiscount = product.discountPercentage > 0;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">
      <Link href={`/products/${product.id}`} className="relative block overflow-hidden">
        {img ? (
          <div className="relative aspect-[4/3] w-full bg-slate-100">
            <Image
              src={img}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition duration-300 group-hover:scale-[1.03]"
              unoptimized={img.startsWith("data:")}
            />
            {hasDiscount && (
              <span className="absolute left-3 top-3 rounded-full bg-rose-600 px-2.5 py-0.5 text-xs font-semibold text-white shadow">
                −{product.discountPercentage}%
              </span>
            )}
          </div>
        ) : (
          <div className="flex aspect-[4/3] items-center justify-center bg-slate-100 text-sm text-slate-600">
            No image
          </div>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/products/${product.id}`} className="min-w-0 flex-1">
            <h3 className="font-semibold leading-snug text-slate-900 transition group-hover:text-blue-700">
              {product.title}
            </h3>
          </Link>
          <div className="flex shrink-0 gap-1 opacity-0 transition group-hover:opacity-100 sm:opacity-100">
            <button
              type="button"
              onClick={() => onEdit(product)}
              className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
              aria-label="Edit"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => onDelete(product)}
              className="rounded-lg p-2 text-rose-600 transition hover:bg-rose-50"
              aria-label="Delete"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 6h18" />
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
              </svg>
            </button>
          </div>
        </div>
        <p className="line-clamp-2 text-sm leading-relaxed text-slate-600">
          {product.desc}
        </p>
        <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3 text-sm">
          <span className="text-lg font-semibold text-slate-900">
            ${finalPrice.toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-slate-400 line-through">
              ${product.price.toFixed(2)}
            </span>
          )}
          <span className="ml-auto rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
            {product.category}
          </span>
        </div>
        <p className="text-xs text-slate-600">Stock: {product.stock}</p>
      </div>
    </article>
  );
}
