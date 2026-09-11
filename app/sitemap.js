import { PRODUCTS, CATEGORIES } from '../lib/catalog';
import { SITE_URL } from '../lib/site-config';

export default function sitemap() {
  const now = new Date();

  const staticRoutes = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${SITE_URL}/produtos`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/contato`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
  ];

  const categoryRoutes = CATEGORIES.map((category) => ({
    url: `${SITE_URL}/produtos?categoria=${category.slug}`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 0.7,
  }));

  const productRoutes = PRODUCTS.map((product) => ({
    url: `${SITE_URL}/produto/${product.id}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
