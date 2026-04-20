import type { GetStaticPaths, GetStaticProps } from "next";
import type { NextPageWithLayout } from "@/pages/_app";
import { ProductDetailView } from "@/components/products/ProductDetailView";
import { getProduct, getProductIds } from "@/lib/products";
import type { Product } from "@/types/product";

type Props = {
  product: Product;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = await getProductIds();
  return {
    paths: ids.map(({ id }) => ({ params: { id } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const id = params?.id;
  if (typeof id !== "string") {
    return { notFound: true };
  }
  const product = await getProduct(id);
  if (!product) {
    return { notFound: true };
  }
  return {
    props: { product },
    revalidate: 60,
  };
};

const ProductDetailPage: NextPageWithLayout<Props> = function ProductDetailPage({
  product,
}: Props) {
  return <ProductDetailView product={product} />;
};

export default ProductDetailPage;
