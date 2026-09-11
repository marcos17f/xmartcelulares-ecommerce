'use client';

import { useEffect, useState } from 'react';

const DEFAULT_SLIDES = [
  {
    eyebrow: 'Novo · iPhone 15 Pro',
    title: 'IMPORTADOS DOS EUA.',
    highlight: 'GARANTIA EXCLUSIVA.',
    text: 'iPhones, MacBooks, iPads e Apple Watch originais, com garantia e entrega para todo o Brasil.',
  },
  {
    eyebrow: 'MacBook Air M3',
    title: 'PERFORMANCE APPLE.',
    highlight: 'PREÇO JUSTO.',
    text: 'Compre importado com segurança e economize sem abrir mão da originalidade.',
  },
  {
    eyebrow: 'AirPods Pro 2',
    title: 'SEU KIT APPLE.',
    highlight: 'COMPLETO E ORIGINAL.',
    text: 'iPhone, MacBook e AirPods prontos para enviar hoje mesmo, com nota fiscal e garantia.',
  },
];

export default function Hero({ slides = DEFAULT_SLIDES }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[active];

  return (
    <section className="hero">
      <div className="hero-rays" />
      <div className="hero-slide">
        <div className="hero-text">
          <span className="hero-eyebrow">{slide.eyebrow}</span>
          <h1>
            {slide.title}
            <br />
            <span>{slide.highlight}</span>
          </h1>
          <p>{slide.text}</p>
          <a href="/produtos" className="btn-cta">
            Comprar Agora
          </a>
        </div>
      </div>
      <div className="hero-dots">
        {slides.map((s, i) => (
          <button
            key={s.eyebrow}
            className={i === active ? 'hero-dot active' : 'hero-dot'}
            onClick={() => setActive(i)}
            aria-label={`Ir para o slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
