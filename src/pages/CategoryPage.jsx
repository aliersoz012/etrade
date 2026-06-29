import { useParams } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import FilterPanel from '../components/FilterPanel';

export default function CategoryPage() {
  const { catId } = useParams();
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('');

  const category = categories.find(c => c.id === catId);

  const filtered = useMemo(() => {
    let result = products.filter(p => p.category === catId);

    if (filters.subcategories?.length) {
      result = result.filter(p => filters.subcategories.includes(p.subcategory));
    }
    if (filters.priceRange) {
      result = result.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);
    }
    if (filters.minRating) {
      result = result.filter(p => p.rating >= filters.minRating);
    }

    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'discount': result.sort((a, b) => b.discount - a.discount); break;
      default: break;
    }
    return result;
  }, [catId, filters, sortBy]);

  return (
    <div className="category-page container">
      <div className="breadcrumb">
        <a href="/">Ana Sayfa</a> / <span>{category?.name || catId}</span>
      </div>
      <div className="category-layout">
        <aside className="category-sidebar">
          <FilterPanel category={catId} filters={filters} onFilterChange={setFilters} />
        </aside>
        <main className="category-content">
          <div className="category-header">
            <h1>{category?.icon} {category?.name}</h1>
            <p>{category?.subcategories?.join(', ')}</p>
            <div className="category-toolbar">
              <span className="result-count">{filtered.length} ürün bulundu</span>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option value="">Sırala</option>
                <option value="price-asc">En Düşük Fiyat</option>
                <option value="price-desc">En Yüksek Fiyat</option>
                <option value="rating">En Yüksek Puan</option>
                <option value="discount">En Çok İndirim</option>
              </select>
            </div>
          </div>
          {filtered.length === 0 ? (
            <div className="no-results">
              <span className="no-results-icon">😕</span>
              <h3>Ürün bulunamadı</h3>
              <p>Farklı filtrelemeler deneyin veya tüm kategorilere göz atın.</p>
            </div>
          ) : (
            <div className="product-grid">
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
