import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-slate-800"
        >
          EMarket
        </Link>
        <nav className="flex flex-wrap items-center gap-1 text-sm font-medium text-slate-600 sm:gap-6">
          <Link
            href="/"
            className="rounded-md px-2 py-1.5 transition hover:bg-slate-100 hover:text-slate-900"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="rounded-md px-2 py-1.5 transition hover:bg-slate-100 hover:text-slate-900"
          >
            Products
          </Link>
          <Link
            href="/about"
            className="rounded-md px-2 py-1.5 transition hover:bg-slate-100 hover:text-slate-900"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="rounded-md px-2 py-1.5 transition hover:bg-slate-100 hover:text-slate-900"
          >
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
          >
            Login
          </button>
          <button
            type="button"
            className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
          >
            Sign up
          </button>
        </div>
      </div>
    </header>
  );
}
