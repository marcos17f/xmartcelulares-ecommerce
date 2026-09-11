export default function CartItem({ name, price, image, quantity = 1, onIncrease, onDecrease, onRemove }) {
  return (
    <div className="cart-item">
      <div className="cart-item-info">
        <div className="cart-item-thumb">
          {image ? <img src={image} alt={name} /> : null}
        </div>
        <div>
          <p className="cart-item-name">{name}</p>
          <p className="cart-item-price">{price}</p>
        </div>
      </div>
      <div className="cart-item-controls">
        <button className="qty-btn" onClick={onDecrease} aria-label="Diminuir quantidade">
          −
        </button>
        <span className="qty-value">{quantity}</span>
        <button className="qty-btn" onClick={onIncrease} aria-label="Aumentar quantidade">
          +
        </button>
        <button className="remove-btn" onClick={onRemove} aria-label="Remover item">
          ✕
        </button>
      </div>
    </div>
  );
}
