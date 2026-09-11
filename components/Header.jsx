'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useCart } from '../lib/cart-context';
import { formatBRL } from '../lib/format';

const NAV_LINKS = [
  { label: 'Início', href: '/', categoria: null },
  { label: 'iPhones', href: '/produtos?categoria=iphones', categoria: 'iphones' },
  { label: 'MacBooks', href: '/produtos?categoria=macbooks', categoria: 'macbooks' },
  { label: 'iPads', href: '/produtos?categoria=ipads', categoria: 'ipads' },
  { label: 'Relógios', href: '/produtos?categoria=watches', categoria: 'watches' },
  { label: 'Acessórios', href: '/produtos?categoria=acessorios', categoria: 'acessorios' },
  { label: 'Ofertas', href: '/produtos?categoria=ofertas', categoria: 'ofertas' },
];

// useSearchParams() precisa estar dentro de um <Suspense> pra não quebrar a
// pré-renderização estática (next build). O fallback usa a mesma classe do
// header pra não gerar um "salto" visual enquanto o conteúdo real carrega.
export default function Header() {
  return (
    <Suspense fallback={<header className="header" />}>
      <HeaderContent />
    </Suspense>
  );
}

function HeaderContent() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategoria = searchParams.get('categoria');
  const { count, subtotal } = useCart();

  const isActive = (link) => {
    if (link.categoria === null) return pathname === '/';
    return pathname === '/produtos' && currentCategoria === link.categoria;
  };

  return (
    <header className="header">
      <Link href="/" className="logo" aria-label="X-mart — página inicial">
        <img src="/images/logo-xmart.png" alt="X-mart" />
      </Link>
      <nav className={menuOpen ? 'nav nav-open' : 'nav'}>
        {NAV_LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={isActive(link) ? 'nav-active' : ''}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="header-actions">
        <button className="icon-btn" aria-label="Buscar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
        <button className="icon-btn" aria-label="Minha conta">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7" />
          </svg>
        </button>
        <Link href="/carrinho" className="icon-btn cart-btn" aria-label="Carrinho">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          {count > 0 ? <span className="cart-count">{count}</span> : null}
          <span className="cart-info">{formatBRL(subtotal)}</span>
        </Link>
        <button
          className="icon-btn nav-toggle"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
}
