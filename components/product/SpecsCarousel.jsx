'use client';

import { useState } from 'react';

export default function SpecsCarousel({ specs }) {
  const [index, setIndex] = useState(0);

  if (!specs || specs.length === 0) return null;

  const prev = () => setIndex((i) => (i - 1 + specs.length) % specs.length);
  const next = () => setIndex((i) => (i + 1) % specs.length);

  return (
    <div className="specs-carousel">
      <div className="specs-carousel-track">
        <p className="specs-carousel-slide">{specs[index]}</p>
      </div>
      <div className="specs-carousel-controls">
        <button type="button" className="specs-carousel-arrow" onClick={prev} aria-label="Especificação anterior">
          ‹
        </button>
        <div className="specs-carousel-dots">
          {specs.map((spec, i) => (
            <button
              key={spec.slice(0, 24) + i}
              type="button"
              className={i === index ? 'specs-carousel-dot active' : 'specs-carousel-dot'}
              onClick={() => setIndex(i)}
              aria-label={`Ir para especificação ${i + 1} de ${specs.length}`}
            />
          ))}
        </div>
        <button type="button" className="specs-carousel-arrow" onClick={next} aria-label="Próxima especificação">
          ›
        </button>
      </div>
      <p className="specs-carousel-count">
        {index + 1} / {specs.length}
      </p>
    </div>
  );
}
