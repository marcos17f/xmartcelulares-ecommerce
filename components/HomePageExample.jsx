// Exemplo de como montar a página inicial com os componentes.
// No Next.js (App Router), isso normalmente vira app/page.jsx
import Header from './Header';
import Hero from './Hero';
import TrustBadges from './TrustBadges';
import NewLaunch from './NewLaunch';
import Categories from './Categories';
import FeaturedProducts from './FeaturedProducts';
import Deals from './Deals';
import BestSellers from './BestSellers';
import WhyBuy from './WhyBuy';
import Testimonials from './Testimonials';
import Footer from './Footer';

export default function HomePageExample() {
  return (
    <>
      <Header />
      <Hero />
      <TrustBadges />
      <NewLaunch />
      <Categories />
      <FeaturedProducts />
      <Deals />
      <BestSellers />
      <WhyBuy />
      <Testimonials />
      <Footer />
    </>
  );
}
