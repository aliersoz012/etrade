import { Link } from 'react-router-dom';
import { categories } from '../data/products';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-section">
            <h3>Alışveriş</h3>
            <ul>
              {categories.slice(0, 4).map(cat => (
                <li key={cat.id}><Link to={`/kategori/${cat.id}`}>{cat.name}</Link></li>
              ))}
            </ul>
          </div>
          <div className="footer-section">
            <h3>Kategoriler</h3>
            <ul>
              {categories.slice(4).map(cat => (
                <li key={cat.id}><Link to={`/kategori/${cat.id}`}>{cat.name}</Link></li>
              ))}
            </ul>
          </div>
          <div className="footer-section">
            <h3>Yardım</h3>
            <ul>
              <li><Link to="/sayfa/sss">Sıkça Sorulan Sorular</Link></li>
              <li><Link to="/sayfa/kargo-ve-teslimat">Kargo ve Teslimat</Link></li>
              <li><Link to="/sayfa/iade-ve-degisim">İade ve Değişim</Link></li>
              <li><Link to="/sayfa/siparis-takibi">Sipariş Takibi</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Kurumsal</h3>
            <ul>
              <li><Link to="/sayfa/hakkimizda">Hakkımızda</Link></li>
              <li><Link to="/sayfa/kariyer">Kariyer</Link></li>
              <li><Link to="/sayfa/iletisim">İletişim</Link></li>
              <li><Link to="/sayfa/gizlilik-politikasi">Gizlilik Politikası</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-badges">
            <span>🔒 Güvenli Alışveriş</span>
            <span>🚚 Ücretsiz Kargo</span>
            <span>🔄 30 Gün İade</span>
            <span>💳 Taksit İmkanı</span>
          </div>
          <p className="footer-copy">© 2026 TrendyShop. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
