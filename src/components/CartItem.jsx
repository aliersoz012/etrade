import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();
  const { addToast } = useToast();

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.image} alt={item.name} />
      </div>
      <div className="cart-item-details">
        <h4>{item.name}</h4>
        <p className="cart-item-brand">{item.brand}</p>
        {item.color && <p className="cart-item-option">Renk: {item.color}</p>}
        {item.size && <p className="cart-item-option">{item.size.match(/GB|TB|MB/) ? 'Depolama' : 'Beden'}: {item.size}</p>}
        <div className="cart-item-price">{item.price.toLocaleString('tr-TR')} TL</div>
      </div>
      <div className="cart-item-quantity">
        <button onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity - 1)} disabled={item.quantity <= 1}>−</button>
        <span>{item.quantity}</span>
        <button onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity + 1)}>+</button>
      </div>
      <div className="cart-item-total">
        {(item.price * item.quantity).toLocaleString('tr-TR')} TL
      </div>
      <button className="cart-item-remove" onClick={() => { removeFromCart(item.id, item.color, item.size); addToast('Ürün sepetten çıkarıldı', 'info'); }}>🗑️</button>
    </div>
  );
}
