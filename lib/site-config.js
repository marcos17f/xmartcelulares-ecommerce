// Configuração central do site — domínio, nome, descrição padrão e IDs de serviços externos.
// Troque NEXT_PUBLIC_SITE_URL no .env quando o domínio definitivo estiver definido.

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.xmartcelulares.com.br').replace(/\/$/, '');

export const SITE_NAME = 'X-mart Celulares';

export const SITE_DESCRIPTION =
  'E-commerce de produtos Apple importados: iPhone, MacBook, iPad, Apple Watch e acessórios, com garantia X-mart e frete grátis.';

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || '';

export const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN || '';
