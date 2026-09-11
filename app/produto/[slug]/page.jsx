import { notFound } from 'next/navigation';
import ProductDetail from '../../../components/product/ProductDetail';
import { getProductById } from '../../../lib/catalog';

export default function Page({ params }) {
  const product = getProductById(params.slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
