import '../styles/xmart-theme.css';
import '../styles/xmart-pages.css';
import { CartProvider } from '../lib/cart-context';
import CookieConsent from '../components/CookieConsent';
import GoogleAnalytics from '../components/GoogleAnalytics';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '../lib/site-config';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — iPhone, MacBook, iPad e mais`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: SITE_NAME,
    title: `${SITE_NAME} — iPhone, MacBook, iPad e mais`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [{ url: '/images/og-default.png', width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — iPhone, MacBook, iPad e mais`,
    description: SITE_DESCRIPTION,
    images: ['/images/og-default.png'],
  },
  // Depois de cadastrar o site no Google Search Console, cole aqui o código
  // de verificação (Configurações > Verificação de propriedade > tag HTML).
  // verification: { google: 'COLE_O_CODIGO_AQUI' },
};

export const viewport = {
  themeColor: '#000000',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <CartProvider>{children}</CartProvider>
        <CookieConsent />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
