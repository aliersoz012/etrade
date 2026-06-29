import { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find(i => i.id === action.product.id && i.color === action.color && i.size === action.size);
      if (existing) {
        return { ...state, items: state.items.map(i => i.id === existing.id && i.color === existing.color && i.size === existing.size ? { ...i, quantity: i.quantity + 1 } : i) };
      }
      return { ...state, items: [...state.items, { ...action.product, color: action.color, size: action.size, quantity: 1 }] };
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter(i => i.id !== action.id || i.color !== action.color || i.size !== action.size) };
    case 'UPDATE_QTY':
      return { ...state, items: state.items.map(i => i.id === action.id && i.color === action.color && i.size === action.size ? { ...i, quantity: Math.max(1, action.quantity) } : i) };
    case 'CLEAR':
      return { ...state, items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addToCart = (product, color = null, size = null) => dispatch({ type: 'ADD', product, color, size });
  const removeFromCart = (id, color, size) => dispatch({ type: 'REMOVE', id, color, size });
  const updateQuantity = (id, color, size, quantity) => dispatch({ type: 'UPDATE_QTY', id, color, size, quantity });
  const clearCart = () => dispatch({ type: 'CLEAR' });

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return <CartContext.Provider value={{ items: state.items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
