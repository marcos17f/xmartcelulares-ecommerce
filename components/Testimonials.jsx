const DEFAULT_TESTIMONIALS = [
  {
    text: 'Comprei meu iPhone e chegou rapidinho, produto original e com garantia. Recomendo!',
    author: 'Cliente Verificado',
  },
  {
    text: 'Atendimento excelente e preço justo. Já é a segunda compra que faço na X-mart.',
    author: 'Cliente Verificado',
  },
];

export default function Testimonials({ testimonials = DEFAULT_TESTIMONIALS }) {
  return (
    <section className="testimonials">
      <h2>O Que Nossos Clientes Dizem</h2>
      <div className="testimonial-grid">
        {testimonials.map((t) => (
          <div className="testimonial-card" key={t.text}>
            <p>&quot;{t.text}&quot;</p>
            <span>— {t.author}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
