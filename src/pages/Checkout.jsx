import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const { user, addresses, addOrder } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedAddr, setSelectedAddr] = useState(null);
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    district: '',
    zip: '',
    note: '',
    cardNumber: '',
    cardName: '',
    cardExp: '',
    cardCvv: '',
    method: 'credit',
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (!user) {
    return (
      <div className="container cart-empty">
        <span className="cart-empty-icon">🔒</span>
        <h2>Giriş yapmalısınız</h2>
        <p>Sipariş verebilmek için lütfen giriş yapın.</p>
        <Link to="/login" className="shop-now-btn">Giriş Yap</Link>
      </div>
    );
  }

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="container cart-empty">
        <span className="cart-empty-icon">🛒</span>
        <h2>Sepetiniz boş</h2>
        <Link to="/" className="shop-now-btn">Alışverişe Başla</Link>
      </div>
    );
  }

  const kargo = totalPrice >= 500 ? 0 : 49.99;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      const now = new Date();
      const orderId = 'TS' + Date.now().toString(36).toUpperCase();
      const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
      addOrder({
        id: orderId,
        date: `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`,
        status: 'shipped',
        statusText: 'Kargoda',
        total: totalPrice + (totalPrice >= 500 ? 0 : 49.99),
        items: items.map(item => ({
          name: item.name,
          price: item.price,
          image: item.image,
        })),
      });
      setOrderPlaced(true);
      clearCart();
    }
  };

  const updateForm = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  if (orderPlaced) {
    return (
      <div className="container order-success">
        <div className="success-card">
          <span className="success-icon">✅</span>
          <h2>Siparişiniz Alındı!</h2>
          <p className="order-number">Sipariş Numarası: <strong>#TS{Date.now().toString(36).toUpperCase()}</strong></p>
          <p>Siparişiniz en kısa sürede hazırlanıp kargoya verilecektir.</p>
          <p>Sipariş detayları e-posta adresinize gönderilecektir.</p>
          <Link to="/" className="shop-now-btn">Ana Sayfaya Dön</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page container">
      <div className="breadcrumb">
        <Link to="/">Ana Sayfa</Link> / <Link to="/cart">Sepet</Link> / <span>Ödeme</span>
      </div>
      <h1>Ödeme</h1>

      <div className="checkout-steps">
        <div className={`step ${step >= 1 ? 'active' : ''}`}><span>1</span> Teslimat</div>
        <div className={`step ${step >= 2 ? 'active' : ''}`}><span>2</span> Ödeme</div>
        <div className={`step ${step >= 3 ? 'active' : ''}`}><span>3</span> Onay</div>
      </div>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="checkout-section">
              <h2>Teslimat Bilgileri</h2>

              {addresses.length > 0 && (
                <>
                  <div className="saved-addresses">
                    <label className="addr-label">Kayıtlı Adreslerim</label>
                    <div className="address-options">
                      {addresses.map(addr => (
                        <div
                          key={addr.id}
                          className={`address-option ${selectedAddr?.id === addr.id ? 'active' : ''}`}
                          onClick={() => {
                            setSelectedAddr(addr);
                            setForm(f => ({
                              ...f,
                              address: addr.detail,
                              city: addr.city,
                              district: addr.district,
                              phone: addr.phone,
                              zip: addr.zip || '',
                            }));
                          }}
                        >
                          <span className="addr-title">{addr.title}</span>
                          <p className="addr-detail">{addr.detail}</p>
                          <p className="addr-city">{addr.district}, {addr.city}</p>
                          <p className="addr-phone">{addr.phone}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="addr-divider"><span>veya yeni adres girin</span></div>
                </>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label>Ad Soyad</label>
                  <input type="text" name="name" value={form.name} onChange={updateForm} required />
                </div>
                <div className="form-group">
                  <label>E-posta</label>
                  <input type="email" name="email" value={form.email} onChange={updateForm} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Telefon</label>
                  <input type="tel" name="phone" placeholder="05XX XXX XX XX" value={form.phone} onChange={updateForm} required />
                </div>
                <div className="form-group">
                  <label>Posta Kodu</label>
                  <input type="text" name="zip" value={form.zip} onChange={updateForm} required />
                </div>
              </div>
              <div className="form-group">
                <label>Adres</label>
                <textarea name="address" rows={3} value={form.address} onChange={updateForm} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>İl</label>
                  <input type="text" name="city" value={form.city} onChange={updateForm} required />
                </div>
                <div className="form-group">
                  <label>İlçe</label>
                  <input type="text" name="district" value={form.district} onChange={updateForm} required />
                </div>
              </div>
              <div className="form-group">
                <label>Sipariş Notu (İsteğe bağlı)</label>
                <textarea name="note" rows={2} value={form.note} onChange={updateForm} />
              </div>
              <button type="submit" className="continue-btn">Devam Et →</button>
            </div>
          )}

          {step === 2 && (
            <div className="checkout-section">
              <h2>Ödeme Yöntemi</h2>
              <div className="payment-methods">
                <label className={`payment-option ${form.method === 'credit' ? 'active' : ''}`}>
                  <input type="radio" name="method" value="credit" checked={form.method === 'credit'} onChange={updateForm} />
                  <span>💳 Kredi Kartı</span>
                </label>
                <label className={`payment-option ${form.method === 'transfer' ? 'active' : ''}`}>
                  <input type="radio" name="method" value="transfer" checked={form.method === 'transfer'} onChange={updateForm} />
                  <span>🏦 Havale / EFT</span>
                </label>
              </div>
              {form.method === 'credit' && (
                <div className="credit-card-form">
                  <div className="form-group">
                    <label>Kart Üzerindeki İsim</label>
                    <input type="text" name="cardName" placeholder="AD SOYAD" value={form.cardName} onChange={updateForm} required />
                  </div>
                  <div className="form-group">
                    <label>Kart Numarası</label>
                    <input type="text" name="cardNumber" placeholder="1234 5678 9012 3456" maxLength={19} value={form.cardNumber} onChange={updateForm} required />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Son Kullanma</label>
                      <input type="text" name="cardExp" placeholder="AA/YY" maxLength={5} value={form.cardExp} onChange={updateForm} required />
                    </div>
                    <div className="form-group">
                      <label>CVV</label>
                      <input type="text" name="cardCvv" placeholder="123" maxLength={3} value={form.cardCvv} onChange={updateForm} required />
                    </div>
                  </div>
                </div>
              )}
              {form.method === 'transfer' && (
                <div className="transfer-info">
                  <p>Banka havalesi ile ödeme yapacaksınız.</p>
                  <p>Sipariş onaylandıktan sonra IBAN bilgileri e-posta ile gönderilecektir.</p>
                </div>
              )}
              <div className="checkout-nav">
                <button type="button" className="back-btn" onClick={() => setStep(1)}>← Geri</button>
                <button type="submit" className="continue-btn">Devam Et →</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="checkout-section">
              <h2>Siparişi Onayla</h2>
              <div className="order-summary">
                <div className="order-summary-section">
                  <h3>Teslimat Adresi</h3>
                  <p>{form.name}</p>
                  <p>{form.address}</p>
                  <p>{form.district}, {form.city} {form.zip}</p>
                  <p>{form.phone}</p>
                </div>
                <div className="order-summary-section">
                  <h3>Ödeme Yöntemi</h3>
                  <p>{form.method === 'credit' ? '💳 Kredi Kartı' : '🏦 Havale/EFT'}</p>
                  {form.method === 'credit' && <p>**** {form.cardNumber.slice(-4)}</p>}
                </div>
              </div>
              <div className="checkout-nav">
                <button type="button" className="back-btn" onClick={() => setStep(2)}>← Geri</button>
                <button type="submit" className="continue-btn">Siparişi Tamamla</button>
              </div>
            </div>
          )}
        </form>

        <div className="checkout-summary">
          <h3>Sipariş Özeti</h3>
          {items.map((item, i) => (
            <div key={i} className="checkout-item">
              <img src={item.image} alt={item.name} />
              <div>
                <p className="checkout-item-name">{item.name} <span>x{item.quantity}</span></p>
                <p className="checkout-item-price">{(item.price * item.quantity).toLocaleString('tr-TR')} TL</p>
              </div>
            </div>
          ))}
          <div className="checkout-totals">
            <div className="summary-row"><span>Ara Toplam</span><span>{totalPrice.toLocaleString('tr-TR')} TL</span></div>
            <div className="summary-row"><span>Kargo</span><span>{kargo === 0 ? 'Ücretsiz' : kargo.toLocaleString('tr-TR') + ' TL'}</span></div>
            <div className="summary-row total"><span>Toplam</span><span>{(totalPrice + kargo).toLocaleString('tr-TR')} TL</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
