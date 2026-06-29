import { Link } from 'react-router-dom';

export default function HeroBanner() {
  const slides = [
    { id: 1, title: 'Yaz Koleksiyonu', subtitle: 'Yeni sezon ürünlerinde %50\'ye varan indirim!', color: '#ff6b6b', link: '/kategori/moda' },
    { id: 2, title: 'Teknoloji Devleri', subtitle: 'iPhone, Samsung, MacBook fırsatları', color: '#845ef7', link: '/kategori/elektronik' },
    { id: 3, title: 'Evde Bahar', subtitle: 'Ev & Yaşam ürünlerinde kaçırılmayacak fırsatlar', color: '#20c997', link: '/kategori/ev-yasam' },
  ];

  return (
    <div className="hero-banner">
      <div className="hero-slides">
        {slides.map(slide => (
          <Link to={slide.link} key={slide.id} className="hero-slide" style={{ backgroundColor: slide.color }}>
            <div className="hero-content">
              <h2>{slide.title}</h2>
              <p>{slide.subtitle}</p>
              <span className="hero-cta">Hemen Alışverişe Başla →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
