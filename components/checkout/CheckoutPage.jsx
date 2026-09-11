'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../Header';
import Footer from '../Footer';
import CheckoutSummary from './CheckoutSummary';
import { useCart } from '../../lib/cart-context';
import { formatBRL } from '../../lib/format';
import { STORE_INFO } from '../../lib/whatsapp';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();

  const [customer, setCustomer] = useState({ name: '', whatsapp: '', city: '' });
  const [fulfillment, setFulfillment] = useState('pickup');
  const [address, setAddress] = useState({ zip: '', street: '', neighborhood: '', city: '' });
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [error, setError] = useState('');

  const handleCustomerChange = (field) => (e) =>
    setCustomer((prev) => ({ ...prev, [field]: e.target.value }));

  const handleAddressChange = (field) => (e) =>
    setAddress((prev) => ({ ...prev, [field]: e.target.value }));

  const handleConfirm = () => {
    if (items.length === 0) return;

    if (!customer.name.trim() || !customer.whatsapp.trim() || !customer.city.trim()) {
      setError('Preencha nome completo, WhatsApp e cidade.');
      return;
    }

    if (fulfillment === 'delivery') {
      const { zip, street, neighborhood, city } = address;
      if (!zip.trim() || !street.trim() || !neighborhood.trim() || !city.trim()) {
        setError('Preencha CEP, endereço, bairro e cidade da entrega.');
        return;
      }
    }

    setError('');

    const order = {
      orderNumber: `#XM${Math.floor(100000 + Math.random() * 900000)}`,
      customer,
      fulfillment:
        fulfillment === 'delivery'
          ? { type: 'delivery', ...address }
          : { type: 'pickup', addressLabel: STORE_INFO.addressLabel },
      paymentMethod,
      items: items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: formatBRL(item.price * item.quantity),
        image: item.image,
      })),
      subtotal: formatBRL(subtotal),
      total: formatBRL(subtotal),
    };

    try {
      window.localStorage.setItem('xmart-last-order', JSON.stringify(order));
    } catch {
      // localStorage indisponível — segue mesmo assim
    }

    clearCart();
    router.push('/pedido-confirmado');
  };

  return (
    <>
      <Header />
      <section className="checkout-page">
        <div className="checkout-form">
          <div className="checkout-steps">
            <div className="checkout-step">
              <div className="checkout-step-header">
                <span className="step-icon">1</span>
                <p>Dados do Cliente</p>
              </div>
              <div className="checkout-grid">
                <label>
                  Nome Completo
                  <input
                    type="text"
                    placeholder="Seu nome"
                    value={customer.name}
                    onChange={handleCustomerChange('name')}
                  />
                </label>
                <label>
                  WhatsApp
                  <input
                    type="tel"
                    placeholder="(00) 00000-0000"
                    value={customer.whatsapp}
                    onChange={handleCustomerChange('whatsapp')}
                  />
                </label>
                <label>
                  Cidade
                  <input
                    type="text"
                    placeholder="Sua cidade"
                    value={customer.city}
                    onChange={handleCustomerChange('city')}
                  />
                </label>
              </div>
            </div>

            <div className="checkout-step">
              <div className="checkout-step-header">
                <span className="step-icon">2</span>
                <p>Entrega</p>
              </div>
              <div className="payment-options">
                <button
                  type="button"
                  className={fulfillment === 'pickup' ? 'payment-option payment-option-active' : 'payment-option'}
                  onClick={() => setFulfillment('pickup')}
                >
                  <span>🏬 Retirar na Loja</span>
                  <span className="payment-option-flags">Sem custo de frete</span>
                </button>
                <button
                  type="button"
                  className={fulfillment === 'delivery' ? 'payment-option payment-option-active' : 'payment-option'}
                  onClick={() => setFulfillment('delivery')}
                >
                  <span>🚚 Entrega</span>
                  <span className="payment-option-flags">Combinada com o vendedor</span>
                </button>
              </div>

              {fulfillment === 'pickup' ? (
                <div className="checkout-pickup-info">
                  <p>📍 {STORE_INFO.addressLabel}</p>
                  <a href={STORE_INFO.mapsUrl} target="_blank" rel="noreferrer">
                    Ver no mapa →
                  </a>
                </div>
              ) : (
                <div className="checkout-grid">
                  <label>
                    CEP
                    <input
                      type="text"
                      placeholder="00000-000"
                      value={address.zip}
                      onChange={handleAddressChange('zip')}
                    />
                  </label>
                  <label>
                    Endereço
                    <input
                      type="text"
                      placeholder="Rua, avenida, número..."
                      value={address.street}
                      onChange={handleAddressChange('street')}
                    />
                  </label>
                  <label>
                    Bairro
                    <input
                      type="text"
                      placeholder="Bairro"
                      value={address.neighborhood}
                      onChange={handleAddressChange('neighborhood')}
                    />
                  </label>
                  <label>
                    Cidade
                    <input
                      type="text"
                      placeholder="Cidade"
                      value={address.city}
                      onChange={handleAddressChange('city')}
                    />
                  </label>
                </div>
              )}
            </div>

            <div className="checkout-step">
              <div className="checkout-step-header">
                <span className="step-icon">3</span>
                <p>Pagamento</p>
              </div>
              <div className="payment-options">
                <button
                  type="button"
                  className={paymentMethod === 'credit_card' ? 'payment-option payment-option-active' : 'payment-option'}
                  onClick={() => setPaymentMethod('credit_card')}
                >
                  <span>💳 Cartão de Crédito</span>
                  <span className="payment-option-flags">VISA · MASTERCARD</span>
                </button>
                <button
                  type="button"
                  className={paymentMethod === 'pix' ? 'payment-option payment-option-active' : 'payment-option'}
                  onClick={() => setPaymentMethod('pix')}
                >
                  <span>🔳 Pix</span>
                  <span className="payment-option-flags">Aprovação imediata</span>
                </button>
              </div>
            </div>

            {error ? <p className="checkout-error">{error}</p> : null}
          </div>
        </div>

        <CheckoutSummary
          items={items.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            price: formatBRL(item.price * item.quantity),
            image: item.image,
          }))}
          subtotal={formatBRL(subtotal)}
          total={formatBRL(subtotal)}
          onConfirm={handleConfirm}
        />
      </section>
      <Footer />
    </>
  );
}
