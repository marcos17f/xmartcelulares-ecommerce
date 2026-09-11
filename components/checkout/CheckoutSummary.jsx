export default function CheckoutSummary({ items = [], subtotal, shipping = 'R$ 0,00', total, onConfirm }) {
  return (
    <div className="checkout-summary">
      <p className="checkout-summary-title">Resumo do Pedido</p>
      {items.map((item) => (
        <div key={item.name} className="checkout-summary-row">
          <span className="checkout-summary-item">
            {item.image ? <img src={item.image} alt={item.name} className="checkout-summary-thumb" /> : null}
            {item.name} (x{item.quantity})
          </span>
          <span>{item.price}</span>
        </div>
      ))}
      <div className="checkout-summary-row checkout-summary-muted">
        <span>Subtotal</span>
        <span>{subtotal}</span>
      </div>
      <div className="checkout-summary-row checkout-summary-muted">
        <span>Envio</span>
        <span>{shipping}</span>
      </div>
      <div className="checkout-summary-row checkout-summary-total">
        <span>Total</span>
        <span>{total}</span>
      </div>
      <button className="btn-cta order-summary-cta" onClick={onConfirm}>
        Confirmar Pedido
      </button>
      <p className="checkout-secure-note">🔒 Compra 100% Segura</p>
    </div>
  );
}
