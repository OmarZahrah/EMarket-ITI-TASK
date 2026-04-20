import Image from "next/image";
import Link from "next/link";
import type { NextPageWithLayout } from "@/pages/_app";
import { SiteShell } from "@/components/layout/SiteShell";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=2000&q=80";

const HomePage: NextPageWithLayout = function HomePage() {
  return (
    <>
      <section className="relative isolate min-h-[min(78vh,720px)] w-full overflow-hidden">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/30"
          aria-hidden
        />
        <div className="relative mx-auto flex min-h-[min(78vh,720px)] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            EMarket
          </p>
          <h1 className="mt-3 max-w-xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Quality essentials for how you live and work
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-600">
            From everyday accessories to the tech you rely on — curated with
            care, priced fairly, and ready to ship.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-600/25 transition hover:bg-blue-700"
            >
              Shop the collection
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
            >
              Our story
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:grid-cols-3">
          <div>
            <p className="text-sm font-semibold text-slate-900">
              Curated selection
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Every product page is built for clarity — sharp photos, full
              descriptions, and stock you can trust.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">
              Straightforward pricing
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              See regular prices and any active discounts upfront. No surprise
              fees at checkout.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">
              Support that shows up
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Questions about fit, compatibility, or delivery? Our team is here
              to help before and after you buy.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

HomePage.getLayout = function getLayout(page) {
  return <SiteShell fullBleed>{page}</SiteShell>;
};

export default HomePage;
