import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';
import { categories } from '../data/products';

export default function Header({ searchQuery, setSearchQuery, onSearch }) {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const { dark, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-top">
        <div className="header-top-inner">
          <span className="header-slogan">Ücretsiz Kargo • 30 Gün İade • Güvenli Alışveriş</span>
          <div className="header-top-links">
            {user ? (
              <div className="user-menu">
                <button className="theme-toggle" onClick={toggleTheme} title={dark ? 'Aydınlık Mod' : 'Karanlık Mod'}>{dark ? '☀️' : '🌙'}</button>
                <Link to="/profile">Hesabım</Link>
                <button onClick={logout} className="logout-btn">Çıkış Yap</button>
              </div>
            ) : (
              <>
                <button className="theme-toggle" onClick={toggleTheme} title={dark ? 'Aydınlık Mod' : 'Karanlık Mod'}>{dark ? '☀️' : '🌙'}</button>
                <Link to="/login">Giriş Yap / Kayıt Ol</Link>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="header-main">
        <Link to="/" className="logo">
          <span className="logo-icon">🛍️</span>
          <span className="logo-text">Trendy<span className="logo-highlight">Shop</span></span>
        </Link>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Ürün, kategori veya marka ara..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && onSearch()}
          />
          <button onClick={onSearch} className="search-btn">🔍</button>
        </div>
        <div className="header-actions">
          <Link to="/cart" className="cart-link">
            <span className="cart-icon">🛒</span>
            <span className="cart-text">Sepetim</span>
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>
        </div>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
      {/* Desktop nav */}
      <nav className="category-nav">
        <div className="category-nav-inner">
          {categories.map(cat => (
            <Link key={cat.id} to={`/kategori/${cat.id}`} className="category-link">
              <span className="cat-icon">{cat.icon}</span>
              <span className="cat-name">{cat.name}</span>
            </Link>
          ))}
        </div>
      </nav>
      {/* Mobile sidebar */}
      {menuOpen && <div className="mobile-overlay" onClick={() => setMenuOpen(false)} />}
      <aside className={`mobile-sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-sidebar-header">
          <span className="logo-text">Trendy<span className="logo-highlight">Shop</span></span>
          <button className="menu-toggle" onClick={() => setMenuOpen(false)}>✕</button>
        </div>
        <nav className="mobile-sidebar-nav">
          {categories.map(cat => (
            <Link key={cat.id} to={`/kategori/${cat.id}`} className="mobile-sidebar-link" onClick={() => setMenuOpen(false)}>
              <span className="cat-icon">{cat.icon}</span>
              <span>{cat.name}</span>
            </Link>
          ))}
        </nav>
        <div className="mobile-sidebar-footer">
          <Link to="/cart" className="mobile-sidebar-link" onClick={() => setMenuOpen(false)}>🛒 Sepetim</Link>
          {user ? (
            <>
              <Link to="/profile" className="mobile-sidebar-link" onClick={() => setMenuOpen(false)}>👤 Hesabım</Link>
              <button onClick={() => { logout(); setMenuOpen(false); }} className="mobile-sidebar-link mobile-logout">Çıkış Yap</button>
            </>
          ) : (
            <Link to="/login" className="mobile-sidebar-link" onClick={() => setMenuOpen(false)}>Giriş Yap / Kayıt Ol</Link>
          )}
        </div>
      </aside>
    </header>
  );
}
