import { useParams, Link } from 'react-router-dom';
import { infoPages } from '../data/infoPages';

export default function InfoPage() {
  const { slug } = useParams();
  const page = infoPages[slug];

  if (!page) {
    return (
      <div className="container not-found-page">
        <span className="not-found-icon">404</span>
        <h2>Sayfa Bulunamadı</h2>
        <p>Aradığınız sayfa mevcut değil.</p>
        <Link to="/" className="shop-now-btn">Ana Sayfaya Dön</Link>
      </div>
    );
  }

  return (
    <div className="info-page">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Ana Sayfa</Link> / <span>{page.title}</span>
        </div>
        <div className="info-card">
          <h1>{page.title}</h1>
          <div className="info-content" dangerouslySetInnerHTML={{ __html: page.content }} />
        </div>
      </div>
    </div>
  );
}
