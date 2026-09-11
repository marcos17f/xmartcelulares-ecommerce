import ProductCard from './ProductCard';
import { getProductById } from '../lib/catalog';
import { formatBRL } from '../lib/format';

const BEST_SELLER_IDS = ['iphone-13-pro', 'jbl-fone-bluetooth', 'apple-watch-se', 'ipad-air-5'];

export default function BestSellers() {
  const products = BEST_SELLER_IDS.map(getProductById).filter(Boolean);

  return (
    <section className="product-section product-section-shaded" id="mais-vendidos">
      <h2>Mais Vendidos</h2>
      <p className="section-subtitle">Os campeões de venda da X-mart este mês</p>
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
