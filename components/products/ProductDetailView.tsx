"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/types/product";
import { priceAfterDiscount } from "@/lib/price";

type Props = {
  product: Product;
};

export function ProductDetailView({ product }: Props) {
  const [activeIdx, setActiveIdx] = useState(0);
  const images = product.images;
  const activeSrc =
    images.length > 0 ? images[Math.min(activeIdx, images.length - 1)] : "";
  const finalPrice = priceAfterDiscount(
    product.price,
    product.discountPercentage,
  );
  const hasDiscount = product.discountPercentage > 0;

  return (
    <div className="space-y-8">
      <nav className="flex flex-wrap items-center gap-1 text-sm text-slate-600">
        <Link href="/" className="hover:text-blue-700">
          Home
        </Link>
        <span className="text-slate-400" aria-hidden>
          /
        </span>
        <Link href="/products" className="hover:text-blue-700">
          Products
        </Link>
        <span className="text-slate-400" aria-hidden>
          /
        </span>
        <span className="font-medium text-slate-800">{product.title}</span>
      </nav>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="grid gap-0 lg:grid-cols-2 lg:gap-0">
          <div className="border-b border-slate-100 bg-slate-50/50 p-4 sm:p-6 lg:border-b-0 lg:border-r lg:border-slate-100">
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                {activeSrc ? (
                  <Image
                    src={activeSrc}
                    alt={product.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                    unoptimized={activeSrc.startsWith("data:")}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-slate-500">
                    No image
                  </div>
                )}
                {hasDiscount && (
                  <span className="absolute left-4 top-4 rounded-full bg-rose-600 px-3 py-1 text-xs font-semibold text-white shadow">
                    −{product.discountPercentage}% off
                  </span>
                )}
              </div>
              {product.images.length > 1 && (
                <div className="flex flex-wrap gap-2">
                  {product.images.map((src, i) => (
                    <button
                      key={`thumb-${i}`}
                      type="button"
                      onClick={() => setActiveIdx(i)}
                      className={`relative h-20 w-20 overflow-hidden rounded-lg border-2 transition ${
                        activeIdx === i
                          ? "border-blue-600 ring-2 ring-blue-100"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <Image
                        src={src}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="80px"
                        unoptimized={src.startsWith("data:")}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col p-6 sm:p-8 lg:justify-center">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800">
                {product.category}
              </span>
              {product.stock > 0 ? (
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800">
                  In stock · {product.stock} left
                </span>
              ) : (
                <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-800">
                  Out of stock
                </span>
              )}
            </div>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              {product.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-end gap-3">
              <span className="text-4xl font-semibold text-slate-900">
                ${finalPrice.toFixed(2)}
              </span>
              {hasDiscount && (
                <span className="text-xl text-slate-400 line-through">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            <p className="mt-2 text-sm text-slate-600">
              Price reflects any active discount. Estimated tax is calculated at
              checkout based on your shipping address.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                disabled={product.stock <= 0}
                className="inline-flex flex-1 items-center justify-center rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Add to cart
              </button>
              <Link
                href="/products"
                className="inline-flex flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 transition hover:border-slate-300 hover:bg-slate-50"
              >
                Continue shopping
              </Link>
            </div>

            <p className="mt-4 text-center text-xs text-slate-500">
              Free standard shipping on orders over $75. Express options
              available at checkout.
            </p>

            <div className="mt-10 border-t border-slate-100 pt-8">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                Description
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-700">
                {product.desc ||
                  "We are preparing a full description for this product. Contact customer care if you need details today."}
              </p>
            </div>

            <dl className="mt-8 grid grid-cols-1 gap-3 rounded-xl bg-slate-50 p-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="font-medium text-slate-500">Category</dt>
                <dd className="mt-0.5 text-slate-800">{product.category}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-500">Availability</dt>
                <dd className="mt-0.5 text-slate-800">
                  {product.stock > 0
                    ? `${product.stock} units`
                    : "Unavailable"}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-blue-50/60 px-4 py-3 text-center text-sm text-slate-700">
        <span className="font-medium text-slate-800">Easy returns</span> within
        30 days on unworn and unused items in original packaging. See our
        return policy for full details.
      </div>
    </div>
  );
}
