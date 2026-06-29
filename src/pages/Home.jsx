import { Link } from 'react-router-dom';
import { products } from '../data/products';
import HeroBanner from '../components/HeroBanner';
import ProductCard from '../components/ProductCard';
import { categories } from '../data/products';

export default function Home() {
  const featured = products.filter(p => p.isFeatured).slice(0, 8);
  const newProducts = products.filter(p => p.isNew).slice(0, 8);
  const discounted = products.filter(p => p.discount > 10).sort((a, b) => b.discount - a.discount).slice(0, 8);

  return (
    <div className="home-page">
      <HeroBanner />

      <section className="category-grid-section">
        <div className="container">
          <h2 className="section-title">Kategoriler</h2>
          <div className="category-grid">
            {categories.map(cat => (
              <Link to={`/kategori/${cat.id}`} key={cat.id} className="category-card">
                <span className="category-card-icon">{cat.icon}</span>
                <span className="category-card-name">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="products-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Öne Çıkan Ürünler</h2>
            <Link to="/kategori/elektronik" className="view-all">Tümünü Gör →</Link>
          </div>
          <div className="product-grid">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      <section className="products-section banner-section">
        <div className="container">
          <div className="promo-banner">
            <div className="promo-content">
              <h3>Yeni Sezon İndirimleri</h3>
              <p>Seçili ürünlerde %50'ye varan indirim fırsatını kaçırma!</p>
              <Link to="/kategori/moda" className="promo-btn">Alışverişe Başla</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="products-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Yeni Ürünler</h2>
            <Link to="/kategori/elektronik" className="view-all">Tümünü Gör →</Link>
          </div>
          <div className="product-grid">
            {newProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      <section className="products-section discount-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Fırsat Ürünleri</h2>
            <Link to="/kategori/supermarket" className="view-all">Tümünü Gör →</Link>
          </div>
          <div className="product-grid">
            {discounted.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
