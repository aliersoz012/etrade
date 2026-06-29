import { useState } from 'react';
import { categories } from '../data/products';

export default function FilterPanel({ category, filters, onFilterChange }) {
  const cat = categories.find(c => c.id === category);
  const [priceRange, setPriceRange] = useState(filters.priceRange || [0, 100000]);

  const handlePriceChange = (e, idx) => {
    const val = parseInt(e.target.value);
    const newRange = idx === 0 ? [val, priceRange[1]] : [priceRange[0], val];
    setPriceRange(newRange);
    onFilterChange({ ...filters, priceRange: newRange });
  };

  return (
    <div className="filter-panel">
      <h3>Filtrele</h3>

      {cat?.subcategories && (
        <div className="filter-section">
          <h4>Alt Kategoriler</h4>
          {cat.subcategories.map(sub => (
            <label key={sub} className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.subcategories?.includes(sub) || false}
                onChange={() => {
                  const subs = filters.subcategories || [];
                  const updated = subs.includes(sub) ? subs.filter(s => s !== sub) : [...subs, sub];
                  onFilterChange({ ...filters, subcategories: updated });
                }}
              />
              {sub}
            </label>
          ))}
        </div>
      )}

      <div className="filter-section">
        <h4>Fiyat Aralığı</h4>
        <div className="price-range">
          <div className="price-inputs">
            <input type="number" value={priceRange[0]} onChange={e => handlePriceChange(e, 0)} min={0} max={100000} />
            <span>-</span>
            <input type="number" value={priceRange[1]} onChange={e => handlePriceChange(e, 1)} min={0} max={100000} />
          </div>
          <input type="range" min={0} max={100000} value={priceRange[0]} onChange={e => handlePriceChange(e, 0)} className="price-slider" />
          <input type="range" min={0} max={100000} value={priceRange[1]} onChange={e => handlePriceChange(e, 1)} className="price-slider" />
        </div>
      </div>

      <div className="filter-section">
        <h4>Puan</h4>
        {[4, 3, 2, 1].map(val => (
          <label key={val} className="filter-checkbox">
            <input
              type="checkbox"
              checked={filters.minRating === val || false}
              onChange={() => onFilterChange({ ...filters, minRating: filters.minRating === val ? 0 : val })}
            />
            {val}+ ★
          </label>
        ))}
      </div>

      {filters.subcategories?.length > 0 || filters.priceRange || filters.minRating ? (
        <button className="clear-filters-btn" onClick={() => onFilterChange({})}>
          Filtreleri Temizle
        </button>
      ) : null}
    </div>
  );
}
