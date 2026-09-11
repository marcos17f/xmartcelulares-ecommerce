export default function OrderSummary({
  subtotal,
  shipping = 'Grátis',
  total,
  ctaLabel = 'Finalizar Compra',
  onSubmit,
  trustItems = [
    { icon: '🛡️', label: 'Compra Garantida' },
    { icon: '🚚', label: 'Entrega para todo Brasil' },
    { icon: '🔒', label: 'Pagamento Seguro' },
  ],
}) {
  return (
    <div className="order-summary-wrapper">
      <div className="order-summary">
        <p className="order-summary-title">Resumo do Pedido</p>
        <div className="order-summary-row">
          <span>Subtotal</span>
          <span>{subtotal}</span>
        </div>
        <div className="order-summary-row order-summary-row-border">
          <span>Entrega</span>
          <span>{shipping}</span>
        </div>
        <div className="order-summary-row order-summary-total">
          <span>Total</span>
          <span>{total}</span>
        </div>
        <button className="btn-cta order-summary-cta" onClick={onSubmit}>
          {ctaLabel}
        </button>
      </div>
      <ul className="order-summary-trust">
        {trustItems.map((item) => (
          <li key={item.label}>
            <span>{item.icon}</span> {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
