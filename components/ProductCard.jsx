export default function ProductCard({
  image,
  alt = 'Produto',
  name,
  description = '',
  rating = 4.5,
  showRating = true,
  price,
  originalPrice,
  badge,
  freeShipping = true,
  href = '#',
  ctaLabel = 'VER DETALHES',
}) {
  const badgeLabel = badge || (freeShipping ? 'FRETE GRÁTIS' : null);

  return (
    <div className="product-card">
      {badgeLabel ? <span className="product-card-shipping">{badgeLabel}</span> : null}
      <div className="product-card-image">
        <img src={image} alt={alt} />
      </div>
      <h3>{name}</h3>
      {description ? <p className="product-card-desc">{description}</p> : null}
      {showRating ? (
        <p className="product-card-stars">{'★'.repeat(Math.round(rating))}{'☆'.repeat(5 - Math.round(rating))}</p>
      ) : null}
      <p className="price">
        {originalPrice ? <span className="price-original">{originalPrice}</span> : null}
        {price}
      </p>
      <a href={href} className="btn-dark">
        {ctaLabel}
      </a>
    </div>
  );
}
