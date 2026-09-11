import Header from '../Header';
import Footer from '../Footer';
import PromoStrip from './PromoStrip';
import FilterSidebar from './FilterSidebar';
import ListingProductCard from './ListingProductCard';
import { getProductsByCategory } from '../../lib/catalog';

const CATEGORY_TITLES = {
  iphones: 'iPhones',
  macbooks: 'MacBooks',
  ipads: 'iPads',
  watches: 'Relógios',
  acessorios: 'Acessórios',
  ofertas: 'Ofertas',
};

export default function ProductListing({ searchParams }) {
  const categoria = searchParams?.categoria || null;
  const products = getProductsByCategory(categoria);
  const title = categoria ? CATEGORY_TITLES[categoria] || 'Produtos' : 'Todos os Produtos';

  return (
    <>
      <Header />
      <PromoStrip />
      <section className="listing-page">
        <FilterSidebar />
        <div className="listing-content">
          <h1 className="listing-title">{title}</h1>
          {products.length === 0 ? (
            <p className="listing-empty">Nenhum produto encontrado nesta categoria.</p>
          ) : (
            <div className="listing-grid">
              {products.map((product) => (
                <ListingProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
