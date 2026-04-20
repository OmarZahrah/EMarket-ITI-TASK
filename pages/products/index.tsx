import type { GetStaticProps } from "next";
import type { NextPageWithLayout } from "@/pages/_app";
import { ProductsClient } from "@/components/products/ProductsClient";
import { getProducts } from "@/lib/products";
import type { Product } from "@/types/product";

type Props = {
  initialProducts: Product[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const initialProducts = await getProducts();
  return {
    props: { initialProducts },
    revalidate: 60,
  };
};

const ProductsPage: NextPageWithLayout<Props> = function ProductsPage({
  initialProducts,
}: Props) {
  return <ProductsClient initialProducts={initialProducts} />;
};

export default ProductsPage;
