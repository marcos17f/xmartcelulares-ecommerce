import CartPage from '../../components/cart/CartPage';

export const metadata = {
  title: 'Carrinho',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <CartPage />;
}
