const sampleReviews = [
  { id: 1, productId: 1, name: 'Ahmet Y.', rating: 5, date: '12 Haziran 2026', comment: 'Harika bir telefon. Kamerası ve performansı inanılmaz. Herkese tavsiye ederim.' },
  { id: 2, productId: 1, name: 'Zeynep K.', rating: 4, date: '8 Haziran 2026', comment: 'Pil ömrü çok iyi, ancak şarj aleti kutuya eklenmemiş.' },
  { id: 3, productId: 2, name: 'Mehmet D.', rating: 5, date: '5 Haziran 2026', comment: 'S Pen desteği mükemmel. Galaxy AI özellikleri çok kullanışlı.' },
  { id: 4, productId: 3, name: 'Elif S.', rating: 5, date: '1 Haziran 2026', comment: 'M3 çip gerçekten çok hızlı. Pil ömrü 2 gün gidiyor.' },
  { id: 5, productId: 4, name: 'Can B.', rating: 5, date: '28 Mayıs 2026', comment: 'Gürültü önleme konusunda rakipsiz. Uzun uçuşlarda harika.' },
  { id: 6, productId: 5, name: 'Ayşe T.', rating: 4, date: '20 Mayıs 2026', comment: 'Sağlık takibi için çok iyi bir cihaz. Tasarımı da şık.' },
  { id: 7, productId: 6, name: 'Burak A.', rating: 5, date: '15 Mayıs 2026', comment: 'M4 çip ile performans canavar. Procreate ile çizim yapmak çok keyifli.' },
  { id: 8, productId: 7, name: 'Selin Y.', rating: 4, date: '10 Mayıs 2026', comment: 'Beklediğimden daha rahat bir koltuk. Montajı biraz zor oldu.' },
  { id: 9, productId: 8, name: 'Ali R.', rating: 5, date: '8 Mayıs 2026', comment: 'Harika bir parfüm. Kalıcılığı çok iyi, tüm gün etkisi devam ediyor.' },
  { id: 10, productId: 9, name: 'Deniz C.', rating: 5, date: '3 Mayıs 2026', comment: 'Sahada ve salonda mükemmel performans. Çok rahat bir ayakkabı.' },
];

export function getReviews(productId) {
  const stored = localStorage.getItem(`etrade_reviews_${productId}`);
  const userReviews = stored ? JSON.parse(stored) : [];
  const sample = sampleReviews.filter(r => r.productId === productId);
  return [...sample, ...userReviews];
}

export function addReview(productId, review) {
  const stored = localStorage.getItem(`etrade_reviews_${productId}`);
  const reviews = stored ? JSON.parse(stored) : [];
  reviews.unshift({ ...review, id: Date.now(), productId, date: new Date().toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' }) });
  localStorage.setItem(`etrade_reviews_${productId}`, JSON.stringify(reviews));
}
