'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '../Header';
import Footer from '../Footer';
import CartItem from './CartItem';
import OrderSummary from './OrderSummary';
import { useCart } from '../../lib/cart-context';
import { formatBRL } from '../../lib/format';

export default function CartPage() {
  const router = useRouter();
  const { items, updateQuantity, removeItem, subtotal, count } = useCart();

  const handleCheckout = () => {
    if (items.length === 0) return;
    router.push('/checkout');
  };

  return (
    <>
      <Header />
      <section className="cart-page">
        <h1 className="cart-title">
          Meu Carrinho de Compras <span>({count} {count === 1 ? 'item' : 'itens'})</span>
        </h1>
        {items.length === 0 ? (
          <p className="cart-empty">
            Seu carrinho está vazio.{' '}
            <Link href="/produtos" className="cart-empty-link">
              Ver produtos
            </Link>
          </p>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  name={item.name}
                  price={formatBRL(item.price)}
                  image={item.image}
                  quantity={item.quantity}
                  onIncrease={() => updateQuantity(item.id, 1)}
                  onDecrease={() => updateQuantity(item.id, -1)}
                  onRemove={() => removeItem(item.id)}
                />
              ))}
            </div>
            <OrderSummary
              subtotal={formatBRL(subtotal)}
              total={formatBRL(subtotal)}
              ctaLabel="Finalizar Compra"
              onSubmit={handleCheckout}
            />
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}
