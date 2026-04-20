import type { NextPageWithLayout } from "@/pages/_app";

const AboutPage: NextPageWithLayout = function AboutPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="mb-4 text-2xl font-semibold text-slate-900">
        About EMarket
      </h1>
      <div className="space-y-4 leading-relaxed text-slate-700">
        <p>
          EMarket started with a simple idea: shopping online should feel as
          considered as walking into your favorite local store. We focus on a
          tight catalog of products we genuinely use — watches, audio gear,
          footwear, and more — so you spend less time comparing and more time
          enjoying what you buy.
        </p>
        <p>
          Our team tests fit, finish, and day-to-day performance before
          anything earns a place on the site. When you read a product
          description, it reflects real experience, not filler copy.
        </p>
        <p>
          Whether you are upgrading your desk setup or replacing a daily
          essential, we are here to make the decision easy and the delivery
          smooth.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
