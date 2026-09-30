import AdminPanel from './components/AdminPanel';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ProductCard from './components/ProductCard';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

function Home({ products, loading, cart, onAddToCart }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  if (loading) return <p>Caricamento prodotti...</p>;

  return (
    <>
      <div className="cart-info">🛒 {cart.length} articoli — €{total.toFixed(2)}</div>
      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </>
  );
}

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

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
    setCart((prevCart) => [...prevCart, product]);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <header className="header">
          <h1><Link to="/">ShopDemo</Link></h1>
          <nav>
            {isLoggedIn ? (
              <>
              <Link to="/admin">Admin</Link>
              <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <Link to="/login">Login</Link>
          )}
          </nav>
        </header>

        <Routes>
          <Route
            path="/"
            element={<Home products={products} loading={loading} cart={cart} onAddToCart={handleAddToCart} />}
          />
          <Route path="/login" element={<Login onLoginSuccess={() => setIsLoggedIn(true)} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;