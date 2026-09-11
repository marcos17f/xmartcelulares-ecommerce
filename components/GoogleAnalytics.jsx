'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { GA_MEASUREMENT_ID } from '../lib/site-config';
import { getStoredConsent } from './CookieConsent';

// Só carrega o GA se: (1) o ID estiver configurado (NEXT_PUBLIC_GA_ID) e
// (2) o visitante já tiver aceitado cookies — exigência da LGPD.
export default function GoogleAnalytics() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    setAllowed(getStoredConsent() === 'accepted');
    const onConsent = (event) => setAllowed(event.detail === 'accepted');
    window.addEventListener('xmart-cookie-consent', onConsent);
    return () => window.removeEventListener('xmart-cookie-consent', onConsent);
  }, []);

  if (!GA_MEASUREMENT_ID || !allowed) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
