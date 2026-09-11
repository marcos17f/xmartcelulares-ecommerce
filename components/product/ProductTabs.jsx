'use client';

import { useState } from 'react';

const DEFAULT_TABS = ['Descrição', 'Especificações', 'Avaliações'];

export default function ProductTabs({ tabs = DEFAULT_TABS, children }) {
  const [active, setActive] = useState(0);

  return (
    <div className="product-tabs">
      <div className="product-tabs-nav">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            className={i === active ? 'product-tab-active' : 'product-tab'}
            onClick={() => setActive(i)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="product-tabs-content">{typeof children === 'function' ? children(active) : children}</div>
    </div>
  );
}
