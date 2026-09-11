'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../Header';
import Footer from '../Footer';
import ProductGallery from './ProductGallery';
import ProductTabs from './ProductTabs';
import SpecsCarousel from './SpecsCarousel';
import SpecsPills from './SpecsPills';
import { useCart } from '../../lib/cart-context';
import { formatBRL } from '../../lib/format';
import { buildReservationMessage, buildWhatsAppLink } from '../../lib/whatsapp';

const DEFAULT_SPECS = [
  'Importado dos EUA com nota fiscal e garantia X-mart.',
  'Produto original lacrado de fábrica.',
  'Suporte pós-venda dedicado.',
];

const DEFAULT_REVIEWS = [
  { author: 'Marcos F.', text: 'Chegou rápido e o produto é original, muito satisfeito com a compra.' },
  { author: 'Ana P.', text: 'Atendimento ótimo e o aparelho veio lacrado, com garantia de verdade.' },
];

export default function ProductDetail({ product }) {
  const router = useRouter();
  const { addItem } = useCart();

  const hasColors = Array.isArray(product.colors) && product.colors.length > 0;
  const hasColorNames = Array.isArray(product.colorNames) && product.colorNames.length > 0;
  const hasOptions = Array.isArray(product.options) && product.options.length > 0;

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedColorName, setSelectedColorName] = useState(hasColorNames ? product.colorNames[0] : null);
  const [selectedOption, setSelectedOption] = useState(hasOptions ? product.options[0] : null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const selectedColor = hasColors ? product.colors[selectedColorIndex] : null;
  const colorLabel = selectedColor?.name || selectedColorName;
  const mainImage = selectedColor ? selectedColor.image : product.image;
  const thumbnails = product.thumbnails && product.thumbnails.length ? product.thumbnails : [product.image];

  const variantLabel = [selectedOption, colorLabel].filter(Boolean).join(' · ');
  const cartId = [product.id, selectedOption, colorLabel].filter(Boolean).join('-');
  const rating = product.rating || 4.5;

  const buildCartItem = () => ({
    id: cartId,
    name: variantLabel ? `${product.name} - ${variantLabel}` : product.name,
    price: product.price,
    image: mainImage,
    quantity,
  });

  const handleAdd = () => {
    addItem(buildCartItem());
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(buildCartItem());
    router.push('/carrinho');
  };

  const handleReserve = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const message = buildReservationMessage({
      productName: product.name,
      variantLabel,
      quantity,
      image: mainImage,
      origin,
    });
    window.open(buildWhatsAppLink(message), '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <Header />
      <section className="product-detail">
        <ProductGallery mainImage={mainImage} thumbnails={thumbnails} />
        <div className="product-info">
          <h1>{product.name}</h1>
          {product.comingSoon ? <span className="coming-soon-badge">Em Breve · Pré-venda</span> : null}
          <p className="product-price">
            {product.originalPrice ? <span className="price-original">{formatBRL(product.originalPrice)}</span> : null}
            {product.comingSoon ? 'A partir de ' : ''}
            {formatBRL(product.price)}
          </p>
          {product.comingSoon ? (
            <p className="coming-soon-note">{product.releaseNote || 'Pré-venda · chegada prevista em breve'}</p>
          ) : (
            <div className="product-rating">
              <span className="stars">
                {'★'.repeat(Math.round(rating))}
                {'☆'.repeat(5 - Math.round(rating))}
              </span>
              <span className="review-count">({product.reviewCount ?? 0} avaliações)</span>
            </div>
          )}

          {hasColors ? (
            <>
              <p className="product-option-label">Cor: {selectedColor.name}</p>
              <div className="product-options">
                {product.colors.map((c, i) => (
                  <button
                    key={c.name}
                    className={i === selectedColorIndex ? 'option-chip option-chip-active' : 'option-chip'}
                    onClick={() => setSelectedColorIndex(i)}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </>
          ) : null}

          {hasColorNames ? (
            <>
              <p className="product-option-label">Cor: {selectedColorName}</p>
              <div className="product-options">
                {product.colorNames.map((name) => (
                  <button
                    key={name}
                    className={name === selectedColorName ? 'option-chip option-chip-active' : 'option-chip'}
                    onClick={() => setSelectedColorName(name)}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </>
          ) : null}

          {hasOptions ? (
            <>
              <p className="product-option-label">{product.optionsLabel || 'Opção'}</p>
              <div className="product-options">
                {product.options.map((opt) => (
                  <button
                    key={opt}
                    className={opt === selectedOption ? 'option-chip option-chip-active' : 'option-chip'}
                    onClick={() => setSelectedOption(opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </>
          ) : null}

          <p className="product-option-label">Quantidade</p>
          <div className="qty-stepper">
            <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Diminuir quantidade">
              −
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity((q) => q + 1)} aria-label="Aumentar quantidade">
              +
            </button>
          </div>

          {product.comingSoon ? (
            <button className="btn-cta product-add-cart" onClick={handleReserve}>
              Reservar Agora pelo WhatsApp
            </button>
          ) : (
            <>
              <button className="btn-cta product-add-cart" onClick={handleAdd}>
                {added ? 'Adicionado ao Carrinho ✓' : 'Adicionar ao Carrinho'}
              </button>
              <button className="btn-buy-now" onClick={handleBuyNow}>
                Comprar Agora
              </button>
            </>
          )}

          <div className="product-trust-row">
            <span>
              <span className="product-trust-icon">🛡️</span> Garantia de 1 Ano
            </span>
            <span>
              <span className="product-trust-icon">🚚</span> Entrega Rápida e Grátis
            </span>
            <span>
              <span className="product-trust-icon">↩️</span> Devolução Fácil
            </span>
          </div>
        </div>
      </section>

      {product.highlightsImage ? (
        <section className="product-highlights">
          <h2>O que o {product.name} oferece</h2>
          <img src={product.highlightsImage} alt={`Resumo dos principais recursos do ${product.name}`} />
        </section>
      ) : null}

      <div className="product-tabs-section">
        <ProductTabs>
          {(active) => {
            if (active === 1) {
              if (product.specPills) {
                return <SpecsPills items={product.specPills} />;
              }
              const specs = product.specs || DEFAULT_SPECS;
              return <SpecsCarousel specs={specs} />;
            }
            if (active === 2) {
              if (product.comingSoon) {
                return (
                  <p>Ainda não há avaliações — este produto está em pré-venda. Reserve o seu e seja um dos primeiros a avaliar!</p>
                );
              }
              const reviews = product.reviews || DEFAULT_REVIEWS;
              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {reviews.map((review) => (
                    <div key={review.author}>
                      <p className="stars">{'★'.repeat(5)}</p>
                      <p>&quot;{review.text}&quot;</p>
                      <p style={{ color: 'var(--xm-gray-light)', fontSize: 12, marginTop: 4 }}>— {review.author}</p>
                    </div>
                  ))}
                </div>
              );
            }
            return <p>{product.description}</p>;
          }}
        </ProductTabs>
      </div>
      <Footer />
    </>
  );
}
