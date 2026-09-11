// Config do Sentry no navegador. Só ativa se NEXT_PUBLIC_SENTRY_DSN estiver
// definido — sem DSN, o SDK fica ocioso e não faz nenhuma chamada de rede.
import * as Sentry from '@sentry/nextjs';

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (dsn) {
  Sentry.init({
    dsn,
    tracesSampleRate: 0.2,
    replaysOnErrorSampleRate: 1.0,
    replaysSessionSampleRate: 0,
  });
}
