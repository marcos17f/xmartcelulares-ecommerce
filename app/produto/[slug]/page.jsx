import { notFound } from 'next/navigation';
import ProductDetail from '../../../components/product/ProductDetail';
import { getProductById } from '../../../lib/catalog';

export function generateMetadata({ params }) {
  const product = getProductById(params.slug);
  if (!product) return {};

  const description = product.summary
    ? `${product.summary} — ${product.description}`.slice(0, 160)
    : product.description?.slice(0, 160);

  return {
    title: product.name,
    description,
    openGraph: {
      title: product.name,
      description,
      images: product.image ? [{ url: product.image, width: 1200, height: 1200, alt: product.name }] : undefined,
    },
  };
}

export default function Page({ params }) {
  const product = getProductById(params.slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
