const DEFAULT_BADGES = [
  { icon: '📦', title: 'Importado dos EUA', text: 'Produtos originais trazidos direto dos Estados Unidos.' },
  { icon: '🛡️', title: 'Garantia Inclusa', text: 'Todos os produtos com garantia e suporte pós-venda.' },
  { icon: '🚚', title: 'Entrega p/ Todo o Brasil', text: 'Envio rastreado para qualquer cidade do país.' },
];

export default function TrustBadges({ badges = DEFAULT_BADGES }) {
  return (
    <section className="trust-badges">
      {badges.map((badge) => (
        <div className="trust-badge-card" key={badge.title}>
          <span className="trust-badge-icon">{badge.icon}</span>
          <div>
            <p className="trust-badge-title">{badge.title}</p>
            <p className="trust-badge-text">{badge.text}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
