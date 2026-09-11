import OrderConfirmation from '../../components/confirmation/OrderConfirmation';

export const metadata = {
  title: 'Pedido Confirmado',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <OrderConfirmation />;
}
