import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import CartItem from '../components/CartItem';

export default function Cart() {
  const { items, totalPrice, totalItems, clearCart } = useCart();
  const { addToast } = useToast();

  if (items.length === 0) {
    return (
      <div className="container cart-empty">
        <span className="cart-empty-icon">🛒</span>
        <h2>Sepetiniz boş</h2>
        <p>Alışverişe başlamak için ürünlere göz atın.</p>
        <Link to="/" className="shop-now-btn">Alışverişe Başla</Link>
      </div>
    );
  }

  const kargo = totalPrice >= 500 ? 0 : 49.99;

  return (
    <div className="cart-page container">
      <div className="breadcrumb">
        <Link to="/">Ana Sayfa</Link> / <span>Sepetim</span>
      </div>
      <h1>Sepetim ({totalItems} ürün)</h1>

      <div className="cart-layout">
        <div className="cart-items">
          <div className="cart-header-row">
            <span>Ürün</span>
            <span>Adet</span>
            <span>Toplam</span>
          </div>
          {items.map((item, i) => (
            <CartItem key={`${item.id}-${item.color}-${item.size}-${i}`} item={item} />
          ))}
          <button className="clear-cart-btn" onClick={() => { clearCart(); addToast('Sepet temizlendi', 'info'); }}>Sepeti Temizle</button>
        </div>

        <div className="cart-summary">
          <h3>Sipariş Özeti</h3>
          <div className="summary-row">
            <span>Ürün Toplam</span>
            <span>{totalPrice.toLocaleString('tr-TR')} TL</span>
          </div>
          <div className="summary-row">
            <span>Kargo</span>
            <span>{kargo === 0 ? 'Ücretsiz' : kargo.toLocaleString('tr-TR') + ' TL'}</span>
          </div>
          <div className="summary-row total">
            <span>Toplam</span>
            <span>{(totalPrice + kargo).toLocaleString('tr-TR')} TL</span>
          </div>
          <Link to="/checkout" className="checkout-btn">Alışverişi Tamamla</Link>
          <Link to="/" className="continue-shopping">Alışverişe Devam Et</Link>
          <div className="cart-badges">
            <span>🔒 Güvenli Alışveriş</span>
            <span>💳 Kredi Kartı / Havale</span>
          </div>
        </div>
      </div>
    </div>
  );
}
