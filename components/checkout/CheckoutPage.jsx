'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../Header';
import Footer from '../Footer';
import CheckoutSummary from './CheckoutSummary';
import { useCart } from '../../lib/cart-context';
import { formatBRL } from '../../lib/format';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('credit_card');

  const handleConfirm = () => {
    if (items.length === 0) return;
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
                <p>Dados Pessoais</p>
              </div>
              <div className="checkout-grid">
                <label>
                  Nome Completo
                  <input type="text" placeholder="Seu nome" />
                </label>
                <label>
                  CPF
                  <input type="text" placeholder="000.000.000-00" />
                </label>
                <label>
                  E-mail
                  <input type="email" placeholder="voce@email.com" />
                </label>
                <label>
                  Telefone
                  <input type="tel" placeholder="(00) 00000-0000" />
                </label>
              </div>
            </div>

            <div className="checkout-step">
              <div className="checkout-step-header">
                <span className="step-icon">2</span>
                <p>Endereço de Entrega</p>
              </div>
              <div className="checkout-grid">
                <label>
                  CEP
                  <input type="text" placeholder="00000-000" />
                </label>
                <label>
                  Endereço
                  <input type="text" placeholder="Rua, avenida..." />
                </label>
                <label>
                  Número
                  <input type="text" placeholder="123" />
                </label>
                <label>
                  Complemento
                  <input type="text" placeholder="Apto, bloco..." />
                </label>
                <label>
                  Bairro
                  <input type="text" placeholder="Bairro" />
                </label>
                <label>
                  Cidade
                  <input type="text" placeholder="Cidade" />
                </label>
                <label>
                  Estado
                  <input type="text" placeholder="UF" />
                </label>
              </div>
            </div>

            <div className="checkout-step">
              <div className="checkout-step-header">
                <span className="step-icon">3</span>
                <p>Pagamento</p>
              </div>
              <div className="payment-options">
                <button
                  className={paymentMethod === 'credit_card' ? 'payment-option payment-option-active' : 'payment-option'}
                  onClick={() => setPaymentMethod('credit_card')}
                >
                  <span>💳 Cartão de Crédito</span>
                  <span className="payment-option-flags">VISA · MASTERCARD</span>
                </button>
                <button
                  className={paymentMethod === 'pix' ? 'payment-option payment-option-active' : 'payment-option'}
                  onClick={() => setPaymentMethod('pix')}
                >
                  <span>🔳 Pix</span>
                  <span className="payment-option-flags">Aprovação imediata</span>
                </button>
              </div>
            </div>
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
