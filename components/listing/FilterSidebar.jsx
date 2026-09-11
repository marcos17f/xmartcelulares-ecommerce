'use client';

import { useState } from 'react';

const STORAGE_OPTIONS = ['128GB', '256GB', '512GB', '1TB'];
const COLOR_OPTIONS = [
  { name: 'Preto', hex: '#111111' },
  { name: 'Prata', hex: '#cccccc' },
  { name: 'Grafite', hex: '#4a4a4a' },
  { name: 'Dourado', hex: '#e8d9b5' },
  { name: 'Azul', hex: '#1e2a4a' },
];

export default function FilterSidebar({ onApply }) {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [storage, setStorage] = useState(['128GB', '256GB']);
  const [color, setColor] = useState(null);

  const toggleStorage = (opt) => {
    setStorage((prev) => (prev.includes(opt) ? prev.filter((s) => s !== opt) : [...prev, opt]));
  };

  return (
    <aside className="filters-sidebar">
      <div className="filter-block">
        <p className="filter-title">Faixa de Preço</p>
        <input type="range" min="0" max="20000" className="filter-slider" />
        <div className="filter-price-inputs">
          <input
            type="text"
            placeholder="R$ min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            type="text"
            placeholder="R$ max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
        <button
          className="btn-cta filter-apply"
          onClick={() => onApply?.({ minPrice, maxPrice, storage, color })}
        >
          Aplicar
        </button>
      </div>

      <div className="filter-block">
        <p className="filter-title">Armazenamento</p>
        {STORAGE_OPTIONS.map((opt) => (
          <label key={opt} className="filter-checkbox">
            <input
              type="checkbox"
              checked={storage.includes(opt)}
              onChange={() => toggleStorage(opt)}
            />
            {opt}
          </label>
        ))}
      </div>

      <div className="filter-block">
        <p className="filter-title">Cor</p>
        <div className="filter-colors">
          {COLOR_OPTIONS.map((c) => (
            <button
              key={c.name}
              type="button"
              className={color === c.name ? 'color-swatch active' : 'color-swatch'}
              style={{ backgroundColor: c.hex }}
              aria-label={c.name}
              onClick={() => setColor(c.name === color ? null : c.name)}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
