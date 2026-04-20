import Link from "next/link";
import type { NextPageWithLayout } from "@/pages/_app";

const NotFoundPage: NextPageWithLayout = function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-[var(--background)] px-4 py-16">
      <p className="text-6xl font-semibold text-slate-800">404</p>
      <p className="text-center text-slate-700">This page could not be found.</p>
      <Link
        href="/"
        className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
      >
        Back to home
      </Link>
    </div>
  );
};

NotFoundPage.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default NotFoundPage;
