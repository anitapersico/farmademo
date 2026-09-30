import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ProductCard from './components/ProductCard';
import Login from './components/Login';
import Register from './components/Register';
import AdminPanel from './components/AdminPanel';
import Toast from './components/Toast';
import Cart from './components/Cart';
import { CATEGORIES } from './constants';
import './App.css';

function Home({ products, loading, onAddToCart }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);
  const [typedText, setTypedText] = useState('');
  const fullText = 'La tua farmacia, sempre a portata di click';

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const scrollToProducts = () => {
    document.getElementById('product-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) return <p className="loading">Caricamento prodotti...</p>;

  const filteredProducts = products.filter((p) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      p.name.toLowerCase().includes(term) ||
      (p.description || '').toLowerCase().includes(term);
    const matchesCategory = !activeCategory || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <section className="hero">
        <div className="hero-decor">
          <span className="floating-icon icon-1">💊</span>
          <span className="floating-icon icon-2">➕</span>
          <span className="floating-icon icon-3">💊</span>
          <span className="floating-icon icon-4">🩹</span>
          <span className="floating-icon icon-5">➕</span>
        </div>
        <div className="hero-content">
          <h2 className="hero-title">
            {typedText}
            <span className="cursor">|</span>
          </h2>
          <p>Prodotti selezionati per la tua salute e il tuo benessere quotidiano.</p>
          <button className="hero-cta" onClick={scrollToProducts}>
            Scopri i prodotti ↓
          </button>
        </div>
      </section>

      <input
        type="text"
        className="search-bar"
        placeholder="Cerca un prodotto..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="category-nav">
        <button
          className={!activeCategory ? 'active' : ''}
          onClick={() => setActiveCategory(null)}
        >
          Tutti
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={activeCategory === cat.id ? 'active' : ''}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div id="product-section">
        {filteredProducts.length === 0 ? (
          <p className="loading">Nessun prodotto trovato.</p>
        ) : (
          <div className="product-list">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} onAddToCart={onAddToCart} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [toastMessage, setToastMessage] = useState('');
  const [cartBump, setCartBump] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product._id === product._id);
      if (existing) {
        return prevCart.map((item) =>
          item.product._id === product._id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevCart, { product, qty: 1 }];
    });

    setToastMessage(`${product.name} aggiunto al carrello`);
    setCartBump(true);
    setTimeout(() => setToastMessage(''), 2200);
    setTimeout(() => setCartBump(false), 400);
  };

  const handleIncrease = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product._id === productId ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const handleDecrease = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.product._id === productId ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const handleRemove = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.product._id !== productId));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);

  return (
    <BrowserRouter>
      <div className="App">
        <header className="header">
          <h1><Link to="/">FarmaDemo</Link></h1>
          <nav>
            {isLoggedIn && <Link to="/admin">Admin</Link>}
            <Link to="/cart" className={`cart-link ${cartBump ? 'bump' : ''}`}>
              🛒 {cartCount} — €{cartTotal.toFixed(2)}
            </Link>
            {isLoggedIn ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </nav>
        </header>

        <Routes>
          <Route
            path="/"
            element={<Home products={products} loading={loading} onAddToCart={handleAddToCart} />}
          />
          <Route path="/login" element={<Login onLoginSuccess={() => setIsLoggedIn(true)} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
                onRemove={handleRemove}
              />
            }
          />
        </Routes>

        <footer className="footer">
          <p>FarmaDemo — progetto realizzato da Anita Persico · <a href="https://github.com/anitapersico/shopdemo" target="_blank" rel="noreferrer">Codice su GitHub</a></p>
        </footer>
      </div>

      <Toast message={toastMessage} />
    </BrowserRouter>
  );
}

export default App;