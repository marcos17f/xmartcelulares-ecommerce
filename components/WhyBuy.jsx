const REASONS = [
  {
    title: '✅ Produtos Originais',
    text: 'Todos os produtos são 100% originais, importados diretamente dos EUA.',
  },
  {
    title: '🛡️ Garantia Real',
    text: 'Garantia inclusa em todos os produtos, com suporte pós-venda dedicado.',
  },
  {
    title: '🚚 Entrega Rápida',
    text: 'Enviamos para todo o Brasil com rastreio completo do pedido.',
  },
];

export default function WhyBuy() {
  return (
    <section className="why-buy">
      <h2>Por Que Comprar na X-mart?</h2>
      <div className="why-grid">
        {REASONS.map((reason) => (
          <div className="why-item" key={reason.title}>
            <h3>{reason.title}</h3>
            <p>{reason.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
