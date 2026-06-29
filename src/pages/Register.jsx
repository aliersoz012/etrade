import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) {
      setError('Şifreler eşleşmiyor.');
      return;
    }
    if (password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır.');
      return;
    }
    if (register(name, email, password)) {
      addToast('Hesabınız oluşturuldu!', 'success');
      navigate('/');
    } else {
      setError('Bu e-posta adresi zaten kayıtlı.');
    }
  };

  return (
    <div className="auth-page container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Kayıt Ol</h1>
          <p>TrendyShop'a katılın, fırsatları kaçırmayın</p>
        </div>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Ad Soyad</label>
            <input type="text" placeholder="Ad Soyad" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>E-posta</label>
            <input type="email" placeholder="ornek@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Şifre</label>
            <input type="password" placeholder="En az 6 karakter" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Şifre Tekrar</label>
            <input type="password" placeholder="Şifrenizi tekrar girin" value={confirm} onChange={e => setConfirm(e.target.value)} required />
          </div>
          <button type="submit" className="auth-btn">Kayıt Ol</button>
        </form>
        <div className="auth-links">
          <Link to="/login">Zaten hesabın var mı? Giriş Yap</Link>
        </div>
      </div>
    </div>
  );
}
