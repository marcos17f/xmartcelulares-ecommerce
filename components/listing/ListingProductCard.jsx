'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../../lib/cart-context';
import { formatBRL } from '../../lib/format';

export default function ListingProductCard({ product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="listing-card">
      {product.comingSoon ? (
        <span className="listing-badge listing-badge-soon">Em Breve</span>
      ) : product.originalPrice ? (
        <span className="listing-badge listing-badge-sale">Promoção</span>
      ) : product.isNew ? (
        <span className="listing-badge listing-badge-novo">Novo</span>
      ) : null}
      <Link href={`/produto/${product.id}`} className="listing-card-image">
        <img src={product.image} alt={product.name} />
      </Link>
      <Link href={`/produto/${product.id}`} className="listing-card-name-link">
        <p className="listing-card-name">{product.name}</p>
      </Link>
      <p className="listing-card-price">
        {product.comingSoon ? 'A partir de ' : ''}
        {formatBRL(product.price)}
      </p>
      {product.comingSoon ? (
        <Link href={`/produto/${product.id}`} className="listing-card-cta">
          RESERVAR AGORA
        </Link>
      ) : (
        <button type="button" className="listing-card-cta" onClick={handleAdd}>
          {added ? 'ADICIONADO ✓' : 'ADICIONAR AO CARRINHO'}
        </button>
      )}
    </div>
  );
}
