'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'xmart-cookie-consent';

export function getStoredConsent() {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getStoredConsent()) setVisible(true);
  }, []);

  const decide = (value) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // localStorage indisponível (modo privado) — o banner só reaparece na próxima visita.
    }
    setVisible(false);
    window.dispatchEvent(new CustomEvent('xmart-cookie-consent', { detail: value }));
  };

  if (!visible) return null;

  return (
    <div className="cookie-consent" role="dialog" aria-live="polite" aria-label="Aviso de cookies">
      <p>
        Usamos cookies para melhorar sua experiência e medir o desempenho do site. Ao continuar navegando, você
        concorda com nossa forma de uso de cookies, de acordo com a LGPD.
      </p>
      <div className="cookie-consent-actions">
        <button type="button" className="cookie-consent-reject" onClick={() => decide('rejected')}>
          Recusar
        </button>
        <button type="button" className="cookie-consent-accept" onClick={() => decide('accepted')}>
          Aceitar
        </button>
      </div>
    </div>
  );
}
