import { createContext, useContext, useState, useEffect } from 'react';

const LS = (key, def) => { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : def; } catch { return def; } };

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => LS('etrade_user', null));
  const [users, setUsers] = useState(() => LS('etrade_users', []));
  const [favorites, setFavorites] = useState(() => LS('etrade_favorites', []));
  const [addresses, setAddresses] = useState(() => LS('etrade_addresses', []));
  const [orders, setOrders] = useState(() => LS('etrade_orders', [
    { id: 'TS001', date: '28 Haziran 2026', status: 'delivered', statusText: 'Teslim Edildi', total: 64999, items: [{ name: 'iPhone 15 Pro Max 256GB', price: 64999, image: 'https://picsum.photos/seed/iphone15/100/100' }] },
    { id: 'TS002', date: '25 Haziran 2026', status: 'shipped', statusText: 'Kargoda', total: 3299, items: [{ name: 'Nike Air Max 270', price: 3299, image: 'https://picsum.photos/seed/nike270/100/100' }] },
  ]));

  useEffect(() => { localStorage.setItem('etrade_user', JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem('etrade_users', JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem('etrade_favorites', JSON.stringify(favorites)); }, [favorites]);
  useEffect(() => { localStorage.setItem('etrade_addresses', JSON.stringify(addresses)); }, [addresses]);
  useEffect(() => { localStorage.setItem('etrade_orders', JSON.stringify(orders)); }, [orders]);

  const login = (email, password) => {
    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
      setUser({ id: found.id, name: found.name, email: found.email, role: found.role || 'user' });
      setFavorites(found.favorites || []);
      setAddresses(found.addresses || []);
      return true;
    }
    return false;
  };

  const register = (name, email, password) => {
    const exists = users.some(u => u.email === email);
    if (exists) return false;
    const newUser = { id: Date.now(), name, email, password, role: 'user', favorites: [], addresses: [] };
    setUsers([...users, newUser]);
    setUser({ id: newUser.id, name, email, role: 'user' });
    setFavorites([]);
    setAddresses([]);
    return true;
  };

  const logout = () => {
    setUser(null);
    setFavorites([]);
    setAddresses([]);
    localStorage.removeItem('etrade_user');
    localStorage.removeItem('etrade_favorites');
    localStorage.removeItem('etrade_addresses');
  };

  const updateProfile = (data) => {
    setUser({ ...user, ...data });
    setUsers(users.map(u => u.id === user.id ? { ...u, ...data } : u));
  };

  const toggleFavorite = (product) => {
    const exists = favorites.some(f => f.id === product.id);
    const updated = exists ? favorites.filter(f => f.id !== product.id) : [...favorites, product];
    setFavorites(updated);
    setUsers(users.map(u => u.id === user?.id ? { ...u, favorites: updated } : u));
  };

  const isFavorite = (productId) => favorites.some(f => f.id === productId);

  const addAddress = (address) => {
    const updated = [...addresses, { ...address, id: Date.now() }];
    setAddresses(updated);
    setUsers(users.map(u => u.id === user?.id ? { ...u, addresses: updated } : u));
  };

  const removeAddress = (id) => {
    const updated = addresses.filter(a => a.id !== id);
    setAddresses(updated);
    setUsers(users.map(u => u.id === user?.id ? { ...u, addresses: updated } : u));
  };

  const addOrder = (order) => {
    const updated = [order, ...orders];
    setOrders(updated);
    setUsers(users.map(u => u.id === user?.id ? { ...u, orders: updated } : u));
  };

  const cancelOrder = (orderId) => {
    const updated = orders.map(o => o.id === orderId ? { ...o, status: 'cancelled', statusText: 'İptal Edildi' } : o);
    setOrders(updated);
    setUsers(users.map(u => u.id === user?.id ? { ...u, orders: updated } : u));
  };

  return <AuthContext.Provider value={{ user, login, register, logout, updateProfile, favorites, toggleFavorite, isFavorite, orders, addresses, addAddress, removeAddress, addOrder, cancelOrder }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
