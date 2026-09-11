import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Página não encontrada',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <div className="state-page">
        <span className="state-page-code">404</span>
        <h1>Essa página não existe</h1>
        <p>O link pode estar quebrado ou o produto que você procura não está mais disponível.</p>
        <div className="state-page-actions">
          <Link href="/" className="state-page-btn state-page-btn-primary">
            Voltar para a Home
          </Link>
          <Link href="/produtos" className="state-page-btn state-page-btn-secondary">
            Ver todos os produtos
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
