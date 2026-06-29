import { Link } from 'react-router-dom';
import Rating from './Rating';

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <Link to={`/urun/${product.id}`}>
        <div className="product-card-image">
          <img src={product.image} alt={product.name} loading="lazy" />
          {product.discount > 0 && <span className="discount-badge">%{product.discount} İNDİRİM</span>}
          {product.isNew && <span className="new-badge">YENİ</span>}
        </div>
        <div className="product-card-info">
          <span className="product-brand">{product.brand}</span>
          <h3 className="product-name">{product.name}</h3>
          <Rating value={product.rating} count={product.reviewCount} />
          <div className="product-price">
            <span className="current-price">{product.price.toLocaleString('tr-TR')} TL</span>
            {product.originalPrice > product.price && (
              <span className="original-price">{product.originalPrice.toLocaleString('tr-TR')} TL</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
