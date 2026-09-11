const PROMOS = [
  { icon: '🚚', label: 'FRETE GRÁTIS' },
  { icon: '🛡️', label: 'REVENDEDOR OFICIAL' },
  { icon: '↩️', label: 'DEVOLUÇÃO EM 30 DIAS' },
];

export default function PromoStrip() {
  return (
    <div className="promo-strip">
      {PROMOS.map((promo) => (
        <span key={promo.label}>
          {promo.icon} {promo.label}
        </span>
      ))}
    </div>
  );
}
