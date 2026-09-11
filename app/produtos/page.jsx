import ProductListing from '../../components/listing/ProductListing';

const CATEGORY_TITLES = {
  iphones: 'iPhones',
  macbooks: 'MacBooks',
  ipads: 'iPads',
  watches: 'Relógios',
  acessorios: 'Acessórios',
  ofertas: 'Ofertas',
};

export function generateMetadata({ searchParams }) {
  const categoria = searchParams?.categoria;
  const label = categoria ? CATEGORY_TITLES[categoria] : null;
  return {
    title: label || 'Todos os Produtos',
    description: label
      ? `Confira os melhores preços em ${label} na X-mart Celulares, com garantia e frete grátis.`
      : 'Catálogo completo de iPhone, MacBook, iPad, Apple Watch e acessórios na X-mart Celulares.',
  };
}

export default function Page({ searchParams }) {
  return <ProductListing searchParams={searchParams} />;
}
