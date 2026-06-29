import { useSearchParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.brand.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="category-page container">
      <div className="breadcrumb">
        <Link to="/">Ana Sayfa</Link> / <span>"{query}" arama sonuçları</span>
      </div>
      <div className="category-header">
        <h1>"{query}" için sonuçlar</h1>
        <p>{filtered.length} ürün bulundu</p>
      </div>
      {filtered.length === 0 ? (
        <div className="no-results">
          <span className="no-results-icon">🔍</span>
          <h3>Sonuç bulunamadı</h3>
          <p>Farklı bir arama terimi deneyin.</p>
          <Link to="/" className="shop-now-btn">Ana Sayfaya Dön</Link>
        </div>
      ) : (
        <div className="product-grid">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
