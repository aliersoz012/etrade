# 🛍️ TrendyShop

**Modern ve kapsamlı bir e-ticaret web uygulaması** — React + Vite ile geliştirilmiş, tamamen işlevsel alışveriş deneyimi.

![Preview](public/icons.svg)

---

## ✨ Özellikler

### 🛒 Alışveriş Deneyimi
- Ürün listeleme, detay sayfası, görsel galerisi
- Kategoriye göre filtreleme ve sıralama
- Ürün arama (marka, kategori, isim)
- Sepet yönetimi (ekleme, çıkarma, adet güncelleme)
- Ödeme adımları (teslimat → ödeme → onay)

### 👤 Kullanıcı Yönetimi
- Kayıt ve giriş sistemi
- Profil bilgileri düzenleme
- Adres ekleme/silme
- Favori ürünler
- Sipariş geçmişi ve kargo takibi
- Sipariş iptal etme

### 💬 Etkileşim
- Ürün değerlendirme ve yorum sistemi
- Toast bildirimleri (sepete ekleme, çıkarma, giriş vs.)
- Favorilerden tek tıkla sepete ekleme
- Ürün paylaşma (WhatsApp, Twitter, Facebook, bağlantı kopyalama)

### 🎨 Tasarım
- **Karanlık / Aydınlık mod** desteği
- Tam **duyarlı (responsive)** tasarım (mobil, tablet, masaüstü)
- Modern ve okunaklı arayüz
- Mobil yan menü (sidebar)
- Yukarı çık butonu
- Sayfa geçişlerinde smooth scroll

### 📦 Bilgi Sayfaları
- Hakkımızda, Kariyer, İletişim
- Gizlilik Politikası
- Sıkça Sorulan Sorular
- Kargo ve Teslimat, İade ve Değişim
- Sipariş Takibi

### 💾 Veri Yönetimi
- **localStorage** ile kalıcı veri (sayfa yenilense de kaybolmaz)
- Kullanıcı, adres, favori ve sipariş verileri otomatik kaydedilir

---

## 🚀 Başlarken

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Üretim derlemesi
npm run build

# Derlemeyi önizle
npm run preview
```

## 📁 Proje Yapısı

```
src/
├── components/        # Bileşenler (Header, Footer, ProductCard, vs.)
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── ProductCard.jsx
│   ├── CartItem.jsx
│   ├── ScrollToTop.jsx
│   └── ...
├── context/           # React Context'ler
│   ├── AuthContext.jsx    # Kullanıcı, adres, favori, sipariş
│   ├── CartContext.jsx    # Sepet yönetimi
│   ├── ThemeContext.jsx   # Karanlık/aydınlık mod
│   └── ToastContext.jsx   # Bildirim sistemi
├── data/              # Statik veri ve yardımcılar
│   ├── products.js        # Ürün ve kategori verileri
│   ├── infoPages.js       # Bilgi sayfası içerikleri
│   └── reviews.js         # Yorum yönetimi
├── pages/             # Sayfalar
│   ├── Home.jsx
│   ├── CategoryPage.jsx
│   ├── ProductDetail.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   ├── Profile.jsx
│   ├── SearchResults.jsx
│   └── ...
├── App.jsx            # Uygulama giriş noktası
├── AppRouter.jsx      # Route tanımlamaları
└── index.css          # Stil dosyası
```

## 🛠️ Kullanılan Teknolojiler

| Teknoloji | Açıklama |
|-----------|----------|
| **React 19** | UI kütüphanesi |
| **Vite 8** | Derleme aracı |
| **React Router 7** | Sayfa yönlendirme |
| **React Context API** | State yönetimi |
| **CSS** | Stil (CSS değişkenleri ile tema) |
| **localStorage** | Veri kalıcılığı |

## 🌐 Tarayıcı Desteği

- Chrome 90+
- Firefox 90+
- Safari 15+
- Edge 90+

## 📄 Lisans

MIT License — Kişisel ve ticari kullanıma açıktır.
