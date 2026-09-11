'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';

// Só é acionado se o próprio RootLayout (app/layout.jsx) quebrar — por isso
// não depende do CSS do tema nem de nenhum componente, e monta seu próprio
// <html>/<body> com estilos inline.
export default function GlobalError({ error, reset }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="pt-BR">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 14,
          textAlign: 'center',
          padding: 24,
          backgroundColor: '#000',
          color: '#fff',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        <span style={{ fontSize: 64, fontWeight: 900, color: '#e60012' }}>500</span>
        <h1 style={{ fontSize: 20, fontWeight: 800, margin: 0 }}>Erro inesperado no servidor</h1>
        <p style={{ color: '#b3b3b3', fontSize: 14, maxWidth: 420, margin: 0 }}>
          Algo deu muito errado por aqui. Já fomos notificados automaticamente.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          style={{
            border: 'none',
            cursor: 'pointer',
            borderRadius: 8,
            padding: '12px 22px',
            fontSize: 13,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.3px',
            backgroundColor: '#e60012',
            color: '#fff',
            marginTop: 8,
          }}
        >
          Tentar novamente
        </button>
      </body>
    </html>
  );
}
