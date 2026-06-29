import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container not-found-page">
      <span className="not-found-icon">404</span>
      <h2>Sayfa Bulunamadı</h2>
      <p>Aradığınız sayfa mevcut değil veya kaldırılmış olabilir.</p>
      <Link to="/" className="shop-now-btn">Ana Sayfaya Dön</Link>
    </div>
  );
}
