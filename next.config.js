const { withSentryConfig } = require('@sentry/nextjs/config');

/** @type {import('next').NextConfig} */
const nextConfig = {};

// withSentryConfig só faz algo além de "passar direto" quando SENTRY_AUTH_TOKEN
// (org/projeto/token do Sentry) estiver configurado — sem isso, o build segue
// normal, só sem o upload de source maps.
module.exports = withSentryConfig(nextConfig, {
  silent: true,
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  disableLogger: true,
  telemetry: false,
});
