import type { NextPageWithLayout } from "@/pages/_app";

const ContactPage: NextPageWithLayout = function ContactPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="mb-4 text-2xl font-semibold text-slate-900">Contact</h1>
      <div className="space-y-6 leading-relaxed text-slate-700">
        <p>
          We respond to most messages within one business day. For order
          questions, include your order number if you have one.
        </p>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-900">Customer care</p>
          <p className="mt-2 text-sm">
            Email:{" "}
            <a
              href="mailto:hello@emarket.example"
              className="text-blue-700 underline decoration-blue-200 underline-offset-2 hover:decoration-blue-600"
            >
              hello@emarket.example
            </a>
          </p>
          <p className="mt-1 text-sm text-slate-600">
            Monday-Friday, 9:00 a.m.-6:00 p.m. Eastern Time
          </p>
        </div>
        <p className="text-sm text-slate-600">
          Merchandising and partnership inquiries:{" "}
          <a
            href="mailto:partners@emarket.example"
            className="font-medium text-blue-700 hover:underline"
          >
            partners@emarket.example
          </a>
        </p>
      </div>
    </div>
  );
};

export default ContactPage;
