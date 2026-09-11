import { SITE_URL } from '../lib/site-config';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/carrinho', '/checkout', '/pedido-confirmado'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
