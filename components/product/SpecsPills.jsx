'use client';

import { useId, useState } from 'react';

export default function SpecsPills({ items }) {
  const [activeId, setActiveId] = useState(items?.[0]?.id);
  const baseId = useId();

  if (!items || items.length === 0) return null;

  const activeItem = items.find((item) => item.id === activeId) || items[0];

  return (
    <section className="specs-pills-section">
      <div className="specs-pills-grid">
        <div className="specs-pills-list">
          {items.map((item) => {
            const isOpen = item.id === activeItem.id;
            const triggerId = `${baseId}-trigger-${item.id}`;
            const panelId = `${baseId}-panel-${item.id}`;

            return (
              <div key={item.id} className={isOpen ? 'specs-pill-item is-open' : 'specs-pill-item'}>
                <button
                  type="button"
                  id={triggerId}
                  className="specs-pill-trigger"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setActiveId(item.id)}
                >
                  <span
                    className="specs-pill-icon"
                    style={isOpen && item.color ? { backgroundColor: item.color, borderColor: item.color } : undefined}
                  >
                    {!item.color ? '+' : null}
                  </span>
                  <span className="specs-pill-label">{item.label}</span>
                </button>
                <div
                  className="specs-pill-panel-wrap"
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  aria-hidden={!isOpen}
                >
                  <div className="specs-pill-panel-inner">
                    <p className="specs-pill-desc">{item.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="specs-pills-visual">
          <div className="specs-pills-image-wrap">
            <img key={activeItem.id} src={activeItem.image} alt={activeItem.label} className="specs-pills-image" />
          </div>
        </div>
      </div>
    </section>
  );
}
