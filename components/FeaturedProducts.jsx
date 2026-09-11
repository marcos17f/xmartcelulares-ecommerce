import ProductCard from './ProductCard';
import { getProductById } from '../lib/catalog';
import { formatBRL } from '../lib/format';

const FEATURED_IDS = ['iphone-15-pro-max', 'macbook-air-m3', 'apple-watch-9', 'airpods-pro-2'];

export default function FeaturedProducts() {
  const products = FEATURED_IDS.map(getProductById).filter(Boolean);

  return (
    <section className="featured-products" id="produtos">
      <h2>Os Mais Desejados</h2>
      <p className="section-subtitle">Os produtos Apple favoritos de quem já comprou na X-mart</p>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            name={product.name}
            description={product.summary}
            rating={product.rating}
            price={formatBRL(product.price)}
            href={`/produto/${product.id}`}
          />
        ))}
      </div>
    </section>
  );
}
