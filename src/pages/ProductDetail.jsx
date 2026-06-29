import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Rating from '../components/Rating';
import ProductCard from '../components/ProductCard';
import { getReviews, addReview } from '../data/reviews';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const { addToCart } = useCart();
  const { user, isFavorite, toggleFavorite } = useAuth();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || null);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || null);
  const [selectedStorage, setSelectedStorage] = useState(product?.storage?.[0] || null);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToast } = useToast();
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({ name: user?.name || '', rating: 5, comment: '' });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => { if (product) setReviews(getReviews(product.id)); }, [product]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    addReview(product.id, reviewForm);
    setReviews(getReviews(product.id));
    setReviewForm({ name: user?.name || '', rating: 5, comment: '' });
    setReviewSubmitted(true);
    addToast('Yorumunuz eklendi', 'success');
    setTimeout(() => setReviewSubmitted(false), 3000);
  };

  if (!product) {
    return (
      <div className="container not-found-page">
        <h2>Ürün bulunamadı</h2>
        <Link to="/">Ana Sayfaya Dön</Link>
      </div>
    );
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize || selectedStorage);
    setAddedToCart(true);
    addToast('Ürün sepete eklendi', 'success');
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="product-detail-page container">
      <div className="breadcrumb">
        <Link to="/">Ana Sayfa</Link> / <Link to={`/kategori/${product.category}`}>{product.category}</Link> / <span>{product.name}</span>
      </div>

      <div className="product-detail-layout">
        <div className="product-images">
          <div className="main-image">
            <img src={product.images[selectedImage]} alt={product.name} />
          </div>
          <div className="thumbnail-list">
            {product.images.map((img, i) => (
              <button key={i} className={`thumbnail ${i === selectedImage ? 'active' : ''}`} onClick={() => setSelectedImage(i)}>
                <img src={img} alt={`${product.name} ${i + 1}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="product-info">
          <span className="product-brand-large">{product.brand}</span>
          <h1>{product.name}</h1>
          <Rating value={product.rating} count={product.reviewCount} />
          <div className="product-price-large">
            <span className="current-price">{product.price.toLocaleString('tr-TR')} TL</span>
            {product.originalPrice > product.price && (
              <>
                <span className="original-price">{product.originalPrice.toLocaleString('tr-TR')} TL</span>
                <span className="discount-tag">%{product.discount} İNDİRİM</span>
              </>
            )}
          </div>

          {product.colors && (
            <div className="product-option">
              <h4>Renk: <span>{selectedColor}</span></h4>
              <div className="color-options">
                {product.colors.map(color => (
                  <button
                    key={color}
                    className={`color-btn ${selectedColor === color ? 'active' : ''}`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.sizes && (
            <div className="product-option">
              <h4>Beden: <span>{selectedSize}</span></h4>
              <div className="size-options">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.storage && (
            <div className="product-option">
              <h4>Depolama: <span>{selectedStorage}</span></h4>
              <div className="size-options">
                {product.storage.map(s => (
                  <button
                    key={s}
                    className={`size-btn ${selectedStorage === s ? 'active' : ''}`}
                    onClick={() => setSelectedStorage(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="product-actions">
            <button className="add-to-cart-btn" onClick={handleAddToCart} disabled={!product.inStock}>
              {addedToCart ? '✓ Sepete Eklendi' : 'Sepete Ekle'}
            </button>
            <button className={`favorite-btn ${isFavorite(product.id) ? 'favorited' : ''}`} onClick={() => toggleFavorite(product)}>
              {isFavorite(product.id) ? '❤️' : '🤍'}
            </button>
          </div>

          {!product.inStock && <p className="out-of-stock">Bu ürün şu anda stokta yok.</p>}

          <div className="product-badges">
            <span>🚚 Ücretsiz Kargo</span>
            <span>🔄 30 Gün İade</span>
            <span>🔒 Güvenli Ödeme</span>
            <span>⭐ 1 Yıl Garanti</span>
          </div>

          <div className="product-share">
            <span>Paylaş:</span>
            <button onClick={() => { navigator.clipboard.writeText(window.location.href); addToast('Bağlantı kopyalandı', 'success'); }} title="Bağlantıyı kopyala">🔗</button>
            <a href={`https://wa.me/?text=${encodeURIComponent(product.name + ' - ' + window.location.href)}`} target="_blank" rel="noopener noreferrer" title="WhatsApp">💬</a>
            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(product.name + ' ' + window.location.href)}`} target="_blank" rel="noopener noreferrer" title="Twitter">🐦</a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" title="Facebook">📘</a>
          </div>
        </div>
      </div>

      <div className="product-detail-bottom">
        <div className="product-description">
          <h2>Ürün Açıklaması</h2>
          <p>{product.description}</p>
          <ul className="feature-list">
            {product.features.map((f, i) => (
              <li key={i}>✓ {f}</li>
            ))}
          </ul>
        </div>

        <div className="product-shipping">
          <h2>Teslimat Bilgileri</h2>
          <ul>
            <li>🚚 Siparişiniz 1-3 iş günü içinde kargoya verilir.</li>
            <li>📦 500 TL ve üzeri alışverişlerde kargo ücretsiz.</li>
            <li>🔄 30 gün içinde koşulsuz iade imkanı.</li>
            <li>🔒 256-bit SSL ile güvenli ödeme.</li>
          </ul>
        </div>
      </div>

      <div className="product-reviews">
        <h2>Değerlendirmeler ({reviews.length})</h2>
        {reviews.length === 0 ? <p className="no-review">Henüz yorum yapılmamış.</p> : (
          <div className="reviews-list">
            {reviews.map(r => (
              <div key={r.id} className="review-card">
                <div className="review-header">
                  <span className="review-author">{r.name}</span>
                  <span className="review-date">{r.date}</span>
                  <span className="review-stars">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
                </div>
                <p className="review-comment">{r.comment}</p>
              </div>
            ))}
          </div>
        )}
        <div className="review-form-section">
          <h3>Yorum Yap</h3>
          {!user ? (
            <p>Yorum yapmak için <Link to="/login">giriş yapın</Link>.</p>
          ) : reviewSubmitted ? (
            <p className="review-thanks">Yorumunuz için teşekkürler!</p>
          ) : (
            <form onSubmit={handleReviewSubmit} className="review-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Ad Soyad</label>
                  <input type="text" value={reviewForm.name} onChange={e => setReviewForm({ ...reviewForm, name: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Puan</label>
                  <select value={reviewForm.rating} onChange={e => setReviewForm({ ...reviewForm, rating: parseInt(e.target.value) })}>
                    {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{'★'.repeat(n)}{'☆'.repeat(5 - n)}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Yorumunuz</label>
                <textarea rows={3} value={reviewForm.comment} onChange={e => setReviewForm({ ...reviewForm, comment: e.target.value })} required />
              </div>
              <button type="submit" className="auth-btn">Yorumu Gönder</button>
            </form>
          )}
        </div>
      </div>

      <section className="products-section">
        <h2 className="section-title">Benzer Ürünler</h2>
        <div className="product-grid">
          {related.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}
