'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { STORE_INFO, WHATSAPP_NUMBER, buildSellerContactMessage, buildWhatsAppLink } from '../../lib/whatsapp';

const PAYMENT_LABELS = {
  pix: 'Pix',
  credit_card: 'Cartão de Crédito',
};

const FALLBACK_ORDER = {
  orderNumber: '#XM284951',
  customer: { name: 'Cliente', whatsapp: '', city: '' },
  items: [
    { name: 'iPhone 15 Pro', quantity: 1, price: 'R$ 7.999,00', image: '/images/iphone-15.png' },
  ],
  subtotal: 'R$ 7.999,00',
  total: 'R$ 7.999,00',
  paymentMethod: 'pix',
  fulfillment: { type: 'pickup', addressLabel: STORE_INFO.addressLabel },
};

export default function OrderConfirmation() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem('xmart-last-order');
      setOrder(raw ? JSON.parse(raw) : FALLBACK_ORDER);
    } catch {
      setOrder(FALLBACK_ORDER);
    }
  }, []);

  if (!order) return null;

  const { orderNumber, customer, items, subtotal, total, paymentMethod, fulfillment } = order;
  const deliveryLabel =
    fulfillment?.type === 'delivery'
      ? `${fulfillment.street}, ${fulfillment.neighborhood} - ${fulfillment.city} · CEP ${fulfillment.zip}`
      : `Retirada na loja · ${fulfillment?.addressLabel || STORE_INFO.addressLabel}`;

  const sellerLink = buildWhatsAppLink(buildSellerContactMessage({ orderNumber }));

  return (
    <section className="confirmation-page">
      <div className="confirmation-card">
        <div className="confirmation-check">✓</div>
        <h1>Pedido Confirmado!</h1>
        <p className="confirmation-message">
          Obrigado, {customer?.name}! Seu pedido foi recebido e em breve um vendedor vai confirmar com você pelo WhatsApp.
        </p>
        <span className="confirmation-order-number">NÚMERO DO PEDIDO: {orderNumber}</span>

        <div className="confirmation-summary">
          <p className="confirmation-summary-title">Resumo do Pedido</p>
          {items.map((item) => (
            <div key={item.name} className="confirmation-item">
              <div className="confirmation-item-thumb">
                {item.image ? <img src={item.image} alt={item.name} /> : null}
              </div>
              <div className="confirmation-item-info">
                <p>{item.name}</p>
                <span>{item.quantity} un</span>
              </div>
              <span className="confirmation-item-price">{item.price}</span>
            </div>
          ))}
          <div className="confirmation-delivery">📦 {deliveryLabel}</div>
        </div>

        <div className="confirmation-totals">
          <div>
            <span>Subtotal</span>
            <span>{subtotal}</span>
          </div>
          <div className="confirmation-total-row">
            <span>Total</span>
            <span>{total}</span>
          </div>
          <div className="confirmation-muted-row">
            <span>Pagamento</span>
            <span>{PAYMENT_LABELS[paymentMethod] || paymentMethod}</span>
          </div>
        </div>

        <a href={sellerLink} target="_blank" rel="noreferrer" className="btn-cta confirmation-cta confirmation-seller-cta">
          💬 Falar com Vendedor
        </a>

        <div className="confirmation-store-info">
          <p className="confirmation-store-title">{STORE_INFO.name}</p>
          <ul>
            <li>✉️ {STORE_INFO.email}</li>
            <li>
              📍{' '}
              <a href={STORE_INFO.mapsUrl} target="_blank" rel="noreferrer">
                {STORE_INFO.addressLabel}
              </a>
            </li>
            <li>
              📷{' '}
              <a href={STORE_INFO.instagramUrl} target="_blank" rel="noreferrer">
                @xmartcelulares_
              </a>
            </li>
            {WHATSAPP_NUMBER ? <li>📱 {WHATSAPP_NUMBER}</li> : null}
          </ul>
        </div>

        <Link href="/" className="btn-cta-outline confirmation-cta">
          Voltar para Loja
        </Link>
      </div>
    </section>
  );
}
