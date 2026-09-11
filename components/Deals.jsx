import ProductCard from './ProductCard';
import { PRODUCTS } from '../lib/catalog';
import { formatBRL } from '../lib/format';

export default function Deals() {
  const deals = PRODUCTS.filter((product) => product.originalPrice).slice(0, 4);
  const discountLabel = (product) => {
    const pct = Math.round(100 - (product.price / product.originalPrice) * 100);
    return `-${pct}% OFF`;
  };

  return (
    <section className="product-section" id="ofertas">
      <h2>Ofertas da Semana</h2>
      <p className="section-subtitle">Até 20% de desconto por tempo limitado</p>
      <div className="product-grid">
        {deals.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            name={product.name}
            description={product.summary}
            rating={product.rating}
            price={formatBRL(product.price)}
            originalPrice={formatBRL(product.originalPrice)}
            badge={discountLabel(product)}
            href={`/produto/${product.id}`}
          />
        ))}
      </div>
    </section>
  );
}
