// Ilustrações "de produto" — mais ricas que os ícones simples de ICONS,
// desenhadas do zero (sem fotos de terceiros/marcas) pra servir de placeholder
// até a loja enviar fotos reais dos produtos. Usam var(--gold) / currentColor
// pra herdar a paleta do site automaticamente.
const PRODUCT_ART = {
  phone: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <ellipse cx="32" cy="58" rx="15" ry="3" fill="var(--gold)" opacity=".12" stroke="none"/>
    <circle cx="32" cy="29" r="22" fill="var(--gold)" opacity=".07" stroke="none"/>
    <rect x="20" y="6" width="24" height="46" rx="5"/>
    <path d="M23 10 L29 10 L23 25 Z" fill="var(--gold)" opacity=".16" stroke="none"/>
    <circle cx="26" cy="12" r="1.4" fill="var(--gold)" stroke="none"/>
    <line x1="28" y1="46" x2="36" y2="46"/>
  </svg>`,

  headphone: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <ellipse cx="32" cy="54" rx="18" ry="3" fill="var(--gold)" opacity=".12" stroke="none"/>
    <circle cx="32" cy="30" r="21" fill="var(--gold)" opacity=".07" stroke="none"/>
    <path d="M14 32 a18 18 0 0 1 36 0" stroke-width="2"/>
    <rect x="10" y="30" width="10" height="17" rx="4"/>
    <rect x="44" y="30" width="10" height="17" rx="4"/>
    <circle cx="49" cy="38.5" r="2.6" fill="var(--gold)" opacity=".55" stroke="none"/>
  </svg>`,

  watch: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <ellipse cx="32" cy="58" rx="14" ry="3" fill="var(--gold)" opacity=".12" stroke="none"/>
    <circle cx="32" cy="31" r="19" fill="var(--gold)" opacity=".07" stroke="none"/>
    <path d="M26 4 h12 v8 h-12 Z" stroke-width="1.3"/>
    <path d="M26 52 h12 v8 h-12 Z" stroke-width="1.3"/>
    <rect x="20" y="20" width="24" height="24" rx="6" stroke-width="1.8"/>
    <rect x="43" y="29" width="3" height="6" rx="1" fill="currentColor" stroke="none"/>
    <path d="M24 26 a10 10 0 0 1 14 -3" stroke="var(--gold)" stroke-width="1.4" opacity=".65"/>
    <circle cx="32" cy="32" r="1.4" fill="var(--gold)" stroke="none"/>
  </svg>`,

  tv: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <ellipse cx="32" cy="58" rx="20" ry="3" fill="var(--gold)" opacity=".12" stroke="none"/>
    <rect x="8" y="10" width="48" height="30" rx="3"/>
    <path d="M24 48 L18 56 M40 48 L46 56"/>
    <rect x="13" y="16" width="9" height="6" rx="1.3" fill="var(--gold)" opacity=".2" stroke="none"/>
    <rect x="24" y="16" width="9" height="6" rx="1.3" fill="var(--gold)" opacity=".2" stroke="none"/>
    <path d="M39 17 l7 4 -7 4 Z" fill="var(--gold)" opacity=".6" stroke="none"/>
  </svg>`,

  speaker: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <ellipse cx="32" cy="60" rx="13" ry="2.6" fill="var(--gold)" opacity=".12" stroke="none"/>
    <circle cx="32" cy="32" r="20" fill="var(--gold)" opacity=".07" stroke="none"/>
    <rect x="20" y="6" width="24" height="52" rx="7"/>
    <rect x="29" y="10" width="6" height="2" rx="1" fill="var(--gold)" stroke="none"/>
    <circle cx="32" cy="19" r="4"/>
    <circle cx="32" cy="19" r="1.3" fill="var(--gold)" stroke="none"/>
    <circle cx="32" cy="40" r="9"/>
    <circle cx="32" cy="40" r="4" stroke="var(--gold)" opacity=".7"/>
  </svg>`,

  charger: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="32" cy="32" r="22" fill="var(--gold)" opacity=".07" stroke="none"/>
    <ellipse cx="32" cy="58" rx="12" ry="2.6" fill="var(--gold)" opacity=".12" stroke="none"/>
    <path d="M35 6 18 34 h10 l-3 24 20-30H35Z" fill="var(--gold)" opacity=".85" stroke="currentColor" stroke-width="1.2"/>
  </svg>`,

  case: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <ellipse cx="32" cy="58" rx="15" ry="3" fill="var(--gold)" opacity=".12" stroke="none"/>
    <circle cx="32" cy="30" r="21" fill="var(--gold)" opacity=".07" stroke="none"/>
    <rect x="17" y="5" width="30" height="50" rx="8" stroke-width="1.7"/>
    <rect x="21" y="9" width="22" height="42" rx="5" stroke-width="1" stroke-dasharray="2 3" opacity=".5"/>
    <circle cx="37" cy="15" r="3" stroke="var(--gold)" stroke-width="1.4"/>
    <path d="M23 44 27 41 M23 47 29 43" opacity=".4"/>
  </svg>`,

  perfume: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <ellipse cx="32" cy="58" rx="14" ry="3" fill="var(--gold)" opacity=".12" stroke="none"/>
    <circle cx="32" cy="30" r="20" fill="var(--gold)" opacity=".07" stroke="none"/>
    <rect x="27" y="4" width="10" height="8" rx="2"/>
    <rect x="29" y="12" width="6" height="6"/>
    <path d="M22 18 h20 v30 a4 4 0 0 1-4 4 H26 a4 4 0 0 1-4-4Z"/>
    <path d="M23 34 h18 v13 a3.3 3.3 0 0 1-3.3 3.3 H26.3 A3.3 3.3 0 0 1 23 47Z" fill="var(--gold)" opacity=".25" stroke="none"/>
    <rect x="25" y="24" width="14" height="6" rx="1" stroke="var(--gold)" stroke-width="1" opacity=".7"/>
    <path d="M46 12 l1.4 3 3 1.4-3 1.4-1.4 3-1.4-3-3-1.4 3-1.4Z" fill="var(--gold)" opacity=".5" stroke="none"/>
  </svg>`,
};

// Fotos reais (genéricas, licença livre — Unsplash) usadas como fallback visual
// até a loja enviar fotos dos produtos que ela realmente vende.
const PRODUCT_PHOTOS = {
  phone: 'img/produtos/phone.jpg',
  headphone: 'img/produtos/headphone.jpg',
  watch: 'img/produtos/watch.jpg',
  tv: 'img/produtos/tv.jpg',
  speaker: 'img/produtos/speaker.jpg',
  charger: 'img/produtos/charger.jpg',
  case: 'img/produtos/case.jpg',
  perfume: 'img/produtos/perfume.jpg',
};

/** Retorna a miniatura do produto: foto real se houver, senão a ilustração/ícone.
 * Passe eager=true pra imagens acima da dobra (ex.: galeria principal do produto). */
function productThumb(p, eager) {
  const photo = PRODUCT_PHOTOS[p.icon];
  if (photo) {
    const loadAttrs = eager ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"';
    return `<img class="prod-photo" src="${photo}" alt="${p.name}" width="400" height="400" ${loadAttrs}>`;
  }
  return PRODUCT_ART[p.icon] || ICONS[p.icon];
}
