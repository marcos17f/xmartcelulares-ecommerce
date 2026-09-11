import Link from 'next/link';

export default function OrderConfirmation({
  customerName = 'Marcos',
  orderNumber = '#XM284951',
  items = [
    { name: 'iPhone 15 Pro', variant: '256GB · Titânio Natural', quantity: 1, price: 'R$ 7.999,00', image: '/images/iphone-15.png' },
  ],
  deliveryEstimate = '3 a 7 dias úteis',
  subtotal = 'R$ 7.999,00',
  shipping = 'Grátis',
  total = 'R$ 7.999,00',
  paymentMethod = 'Pix',
  deliveryAddress = 'Av. Paulista, 1000 - São Paulo - SP',
}) {
  return (
    <section className="confirmation-page">
      <div className="confirmation-card">
        <div className="confirmation-check">✓</div>
        <h1>Pedido Confirmado!</h1>
        <p className="confirmation-message">
          Obrigado, {customerName}! Seu pedido foi recebido com sucesso e está sendo processado.
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
                <p>
                  {item.name}
                  {item.variant ? `, ${item.variant}` : ''}
                </p>
                <span>{item.quantity} un</span>
              </div>
              <span className="confirmation-item-price">{item.price}</span>
            </div>
          ))}
          <div className="confirmation-delivery">📅 Estimativa de Entrega: {deliveryEstimate}</div>
        </div>

        <div className="confirmation-totals">
          <div>
            <span>Subtotal</span>
            <span>{subtotal}</span>
          </div>
          <div>
            <span>Frete</span>
            <span>{shipping}</span>
          </div>
          <div className="confirmation-total-row">
            <span>Total</span>
            <span>{total}</span>
          </div>
          {paymentMethod ? (
            <div className="confirmation-muted-row">
              <span>Pagamento</span>
              <span>{paymentMethod}</span>
            </div>
          ) : null}
          {deliveryAddress ? (
            <div className="confirmation-muted-row">
              <span>Endereço</span>
              <span>{deliveryAddress}</span>
            </div>
          ) : null}
        </div>

        <Link href="/" className="btn-cta confirmation-cta">
          Voltar para Loja
        </Link>
      </div>
    </section>
  );
}
