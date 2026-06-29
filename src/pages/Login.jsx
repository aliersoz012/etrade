import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (login(email, password)) {
      addToast('Başarıyla giriş yaptınız', 'success');
      navigate('/');
    } else {
      setError('E-posta veya şifre hatalı.');
    }
  };

  return (
    <div className="auth-page container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Giriş Yap</h1>
          <p>TrendyShop hesabınıza giriş yapın</p>
        </div>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>E-posta</label>
            <input type="email" placeholder="ornek@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Şifre</label>
            <input type="password" placeholder="••••••" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="auth-btn">Giriş Yap</button>
        </form>
        <div className="auth-links">
          <Link to="/register">Hesabın yok mu? Kayıt Ol</Link>
        </div>
      </div>
    </div>
  );
}
