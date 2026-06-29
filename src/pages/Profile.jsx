import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export default function Profile() {
  const { user, updateProfile, favorites, toggleFavorite, orders, addresses, addAddress, removeAddress, cancelOrder } = useAuth();
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [saved, setSaved] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [addressForm, setAddressForm] = useState({ title: '', city: '', district: '', detail: '', phone: '', zip: '' });

  if (!user) {
    return (
      <div className="container cart-empty">
        <span className="cart-empty-icon">🔒</span>
        <h2>Giriş yapmalısınız</h2>
        <Link to="/login" className="shop-now-btn">Giriş Yap</Link>
      </div>
    );
  }

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile({ name, email });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    addAddress(addressForm);
    setAddressForm({ title: '', city: '', district: '', detail: '', phone: '', zip: '' });
    setShowAddressForm(false);
  };

  const tabs = [
    { id: 'profile', label: '👤 Profil Bilgileri' },
    { id: 'orders', label: '📦 Siparişlerim' },
    { id: 'favorites', label: '❤️ Favorilerim' },
    { id: 'addresses', label: '📍 Adreslerim' },
    { id: 'settings', label: '⚙️ Ayarlar' },
  ];

  return (
    <div className="profile-page container">
      <div className="breadcrumb">
        <Link to="/">Ana Sayfa</Link> / <span>Hesabım</span>
      </div>
      <h1>Hesabım</h1>

      <div className="profile-layout">
        <aside className="profile-sidebar">
          <div className="profile-avatar">
            <span className="avatar-letter">{user.name[0]}</span>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
          <nav className="profile-nav">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`profile-nav-item ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        <main className="profile-content">
          {activeTab === 'profile' && (
            <form onSubmit={handleSave} className="profile-form">
              <h2>Profil Bilgileri</h2>
              <div className="form-group">
                <label>Ad Soyad</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>E-posta</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Üyelik Tarihi</label>
                <input type="text" value="Haziran 2026" disabled />
              </div>
              <button type="submit" className="auth-btn">{saved ? '✓ Kaydedildi' : 'Bilgileri Kaydet'}</button>
            </form>
          )}

          {activeTab === 'orders' && (
            <div className="profile-orders">
              <h2>Sipariş Geçmişim</h2>
              {orders.length === 0 ? (
                <p className="empty-section">Henüz siparişiniz bulunmuyor.</p>
              ) : (
                orders.map(order => {
                  const isExpanded = expandedOrder === order.id;
                  const isCancelled = order.status === 'cancelled';
                  const trackingSteps = isCancelled ? [
                    { done: true, label: 'Sipariş Alındı', date: order.date },
                    { done: true, label: 'İptal Edildi', date: order.date },
                  ] : [
                    { done: true, label: 'Sipariş Alındı', date: order.date },
                    { done: order.status !== 'pending', label: 'Hazırlanıyor', date: order.status !== 'pending' ? order.date : '' },
                    { done: order.status === 'shipped' || order.status === 'delivered', label: 'Kargoya Verildi', date: order.status === 'shipped' || order.status === 'delivered' ? order.date : '' },
                    { done: order.status === 'delivered', label: 'Teslim Edildi', date: order.status === 'delivered' ? order.date : '' },
                  ];
                  return (
                    <div key={order.id} className="order-card">
                      <div className="order-card-header" onClick={() => setExpandedOrder(isExpanded ? null : order.id)} style={{ cursor: 'pointer' }}>
                        <span className="order-id">Sipariş #{order.id}</span>
                        <span className="order-date">{order.date}</span>
                        <span className={`order-status ${order.status}`}>{order.statusText}</span>
                        <span style={{ marginLeft: 'auto', fontSize: 12 }}>{isExpanded ? '▲' : '▼'}</span>
                      </div>
                      {isExpanded && (
                        <div className="order-card-body">
                          <div className="order-tracking-steps">
                            {trackingSteps.map((step, si) => (
                              <div key={si} className={`tracking-step ${step.done ? 'done' : ''}`}>
                                <div className="tracking-dot" />
                                <div className="tracking-info">
                                  <span className="tracking-label">{step.label}</span>
                                  {step.date && <span className="tracking-date">{step.date}</span>}
                                </div>
                              </div>
                            ))}
                          </div>
                          {order.items.map((item, i) => (
                            <div key={i} className="order-product">
                              <img src={item.image} alt={item.name} />
                              <div>
                                <p>{item.name}</p>
                                <p>{item.price.toLocaleString('tr-TR')} TL</p>
                              </div>
                            </div>
                          ))}
                          <div className="order-total">Toplam: {order.total.toLocaleString('tr-TR')} TL</div>
                          {order.status !== 'cancelled' && order.status !== 'delivered' && (
                            <button
                              className="cancel-order-btn"
                              onClick={() => { cancelOrder(order.id); addToast('Sipariş iptal edildi', 'info'); }}
                            >
                              Siparişi İptal Et
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}

          {activeTab === 'favorites' && (
            <div className="profile-favorites">
              <h2>Favorilerim</h2>
              {favorites.length === 0 ? (
                <div className="empty-section">
                  <p>Favori ürününüz bulunmuyor.</p>
                  <Link to="/" className="shop-now-btn" style={{ marginTop: 16, display: 'inline-block' }}>Alışverişe Başla</Link>
                </div>
              ) : (
                <div className="favorites-grid">
                  {favorites.map(product => (
                    <div key={product.id} className="favorite-item">
                      <Link to={`/urun/${product.id}`}>
                        <img src={product.image} alt={product.name} />
                        <h4>{product.name}</h4>
                        <p className="favorite-price">{product.price.toLocaleString('tr-TR')} TL</p>
                      </Link>
                      <button className="remove-favorite" onClick={() => toggleFavorite(product)} title="Favorilerden çıkar">❤️</button>
                      <button className="fav-add-cart" onClick={() => { addToCart(product); addToast('Ürün sepete eklendi', 'success'); }} title="Sepete ekle">🛒</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="profile-addresses">
              <div className="address-header">
                <h2>Adreslerim</h2>
                <button className="add-address-btn" onClick={() => setShowAddressForm(!showAddressForm)}>
                  {showAddressForm ? '✕ Vazgeç' : '+ Yeni Adres'}
                </button>
              </div>

              {showAddressForm && (
                <form onSubmit={handleAddressSubmit} className="address-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Adres Başlığı</label>
                      <input type="text" placeholder="Ev / İş" value={addressForm.title} onChange={e => setAddressForm({ ...addressForm, title: e.target.value })} required />
                    </div>
                  <div className="form-group">
                    <label>Telefon</label>
                    <input type="tel" placeholder="05XX XXX XX XX" value={addressForm.phone} onChange={e => setAddressForm({ ...addressForm, phone: e.target.value })} required />
                  </div>
                  <div className="form-group">
                    <label>Posta Kodu</label>
                    <input type="text" placeholder="34000" value={addressForm.zip} onChange={e => setAddressForm({ ...addressForm, zip: e.target.value })} required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>İl</label>
                      <input type="text" placeholder="İstanbul" value={addressForm.city} onChange={e => setAddressForm({ ...addressForm, city: e.target.value })} required />
                    </div>
                    <div className="form-group">
                      <label>İlçe</label>
                      <input type="text" placeholder="Kadıköy" value={addressForm.district} onChange={e => setAddressForm({ ...addressForm, district: e.target.value })} required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Adres Detayı</label>
                    <textarea rows={2} placeholder="Mahalle, sokak, apartman, daire..." value={addressForm.detail} onChange={e => setAddressForm({ ...addressForm, detail: e.target.value })} required />
                  </div>
                  <button type="submit" className="auth-btn">Adresi Kaydet</button>
                </form>
              )}

              {addresses.length === 0 && !showAddressForm ? (
                <div className="empty-section">
                  <p>Kayıtlı adresiniz bulunmuyor.</p>
                </div>
              ) : (
                <div className="address-list">
                  {addresses.map(addr => (
                    <div key={addr.id} className="address-card">
                      <div className="address-card-header">
                        <span className="address-title">{addr.title}</span>
                        <button className="remove-address" onClick={() => removeAddress(addr.id)}>🗑️</button>
                      </div>
                      <p>{addr.detail}</p>
                      <p>{addr.district}, {addr.city} {addr.zip}</p>
                      <p>{addr.phone}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="profile-settings">
              <h2>Ayarlar</h2>
              <div className="settings-section">
                <h3>Bildirim Tercihleri</h3>
                <label className="setting-item">
                  <input type="checkbox" defaultChecked />
                  <span>E-posta bildirimleri</span>
                </label>
                <label className="setting-item">
                  <input type="checkbox" defaultChecked />
                  <span>SMS bildirimleri</span>
                </label>
                <label className="setting-item">
                  <input type="checkbox" defaultChecked />
                  <span>Kampanya ve fırsat bildirimleri</span>
                </label>
              </div>
              <div className="settings-section">
                <h3>Güvenlik</h3>
                <button className="setting-btn">Şifre Değiştir</button>
              </div>
              <div className="settings-section">
                <h3>Hesap</h3>
                <button className="setting-btn danger">Hesabımı Sil</button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
