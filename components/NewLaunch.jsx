import ProductCard from './ProductCard';
import { getProductById } from '../lib/catalog';
import { formatBRL } from '../lib/format';

const LAUNCH_IDS = ['iphone-duo', 'iphone-18-pro', 'iphone-18-pro-max'];

export default function NewLaunch() {
  const products = LAUNCH_IDS.map(getProductById).filter(Boolean);

  if (products.length === 0) return null;

  return (
    <section className="product-section new-launch" id="iphone-18">
      <span className="new-launch-eyebrow">Chegou a hora</span>
      <h2>Novo iPhone 18 — Reserve o Seu</h2>
      <p className="section-subtitle">
        Garanta prioridade na fila assim que o novo iPhone 18 chegar aos EUA. Sem compromisso — você só paga na entrega.
      </p>
      <div className="new-launch-video">
        <video
          controls
          preload="metadata"
          poster="/images/iphone-18-lineup.webp"
          aria-label="Vídeo de apresentação da linha iPhone 18"
        >
          <source src="/videos/iphone-18-apresentacao.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            name={product.name}
            description={product.releaseNote}
            showRating={false}
            price={`A partir de ${formatBRL(product.price)}`}
            badge="EM BREVE"
            freeShipping={false}
            href={`/produto/${product.id}`}
            ctaLabel="RESERVAR AGORA"
          />
        ))}
      </div>
    </section>
  );
}
