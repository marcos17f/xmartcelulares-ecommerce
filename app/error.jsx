'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Error({ error, reset }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <>
      <Header />
      <div className="state-page">
        <span className="state-page-code">Ops</span>
        <h1>Algo deu errado</h1>
        <p>Tivemos um problema ao carregar essa página. Já fomos notificados — tenta de novo em alguns instantes.</p>
        <div className="state-page-actions">
          <button type="button" className="state-page-btn state-page-btn-primary" onClick={() => reset()}>
            Tentar novamente
          </button>
          <a href="/" className="state-page-btn state-page-btn-secondary">
            Voltar para a Home
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}
