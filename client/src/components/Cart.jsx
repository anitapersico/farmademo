import { useState } from 'react';
import { Link } from 'react-router-dom';

function Cart({ cart, onIncrease, onDecrease, onRemove }) {
  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);

  const handleCheckout = () => {
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="checkout-success">
        <div className="checkout-icon">✓</div>
        <h2>Grazie per il tuo ordine!</h2>
        <p>Questo è un pagamento simulato a scopo dimostrativo — nessun addebito reale è stato effettuato.</p>
        <Link to="/" className="back-home-btn">Torna al negozio</Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <p>Il tuo carrello è vuoto.</p>
        <Link to="/" className="back-home-btn">Vai al catalogo</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Il tuo carrello</h2>
      <div className="cart-items">
        {cart.map((item) => (
          <div className="cart-item" key={item.product._id}>
            <img
              src={item.product.image?.trim() || `https://picsum.photos/seed/${item.product._id}/100/100`}
              alt={item.product.name}
              className="cart-item-image"
              referrerPolicy="no-referrer"
            />
            <div className="cart-item-info">
              <h3>{item.product.name}</h3>
              <p className="price">€{item.product.price} cad.</p>
            </div>
            <div className="qty-controls">
              <button onClick={() => onDecrease(item.product._id)}>−</button>
              <span>{item.qty}</span>
              <button onClick={() => onIncrease(item.product._id)}>+</button>
            </div>
            <p className="cart-item-subtotal">€{(item.product.price * item.qty).toFixed(2)}</p>
            <button className="remove-btn" onClick={() => onRemove(item.product._id)}>
              Rimuovi
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <p>Totale: <strong>€{total.toFixed(2)}</strong></p>
        <button className="checkout-btn" onClick={handleCheckout}>
          Effettua pagamento
        </button>
      </div>
    </div>
  );
}

export default Cart;