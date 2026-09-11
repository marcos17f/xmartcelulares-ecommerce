const FOOTER_COLUMNS = [
  {
    title: 'Sobre Nós',
    links: ['Quem Somos', 'Nossa História', 'Trabalhe Conosco'],
  },
  {
    title: 'Contato',
    links: ['Fale Conosco', 'WhatsApp', 'contato@xmart.com.br'],
  },
  {
    title: 'Suporte',
    links: ['Central de Ajuda', 'Trocas e Garantia', 'Rastrear Pedido'],
  },
  {
    title: 'Pagamento',
    links: ['Cartão de Crédito', 'Pix', 'Boleto'],
  },
  {
    title: 'Redes Sociais',
    links: ['Instagram', 'Facebook', 'TikTok'],
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-columns">
        {FOOTER_COLUMNS.map((column) => (
          <div className="footer-column" key={column.title}>
            <p className="footer-column-title">{column.title}</p>
            <ul>
              {column.links.map((label) => (
                <li key={label}>
                  <button className="footer-link" type="button">
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} X-mart. Todos os direitos reservados.</span>
        <span>Importados dos EUA · Garantia Exclusiva</span>
      </div>
    </footer>
  );
}
