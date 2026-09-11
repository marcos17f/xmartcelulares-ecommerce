import Link from 'next/link';

const DEFAULT_CATEGORIES = [
  { label: 'iPhones', categoria: 'iphones' },
  { label: 'MacBooks', categoria: 'macbooks' },
  { label: 'iPads', categoria: 'ipads' },
  { label: 'Relógios', categoria: 'watches' },
  { label: 'Acessórios', categoria: 'acessorios' },
];

export default function Categories({ categories = DEFAULT_CATEGORIES }) {
  return (
    <section className="categories">
      <h2>Nossas Categorias</h2>
      <div className="category-grid">
        {categories.map((cat) => (
          <Link className="category-card" key={cat.categoria} href={`/produtos?categoria=${cat.categoria}`}>
            {cat.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
