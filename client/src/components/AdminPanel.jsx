import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  const loadProducts = () => {
    fetch('http://localhost:3000/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Se non c'è token, rimanda al login invece di mostrare la pagina
  if (!token) {
    return <Navigate to="/login" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, price: parseFloat(price), description }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Errore nella creazione del prodotto');
        return;
      }

      setName('');
      setPrice('');
      setDescription('');
      loadProducts(); // ricarica la lista aggiornata
    } catch (err) {
      setError('Errore di connessione al server');
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      loadProducts();
    } catch (err) {
      setError('Errore nella cancellazione');
    }
  };

  return (
    <div className="admin-panel">
      <h2>Pannello Admin</h2>

      <form onSubmit={handleSubmit} className="admin-form">
        <input
          type="text"
          placeholder="Nome prodotto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          step="0.01"
          placeholder="Prezzo"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Descrizione"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Aggiungi prodotto</button>
      </form>
      {error && <p className="error">{error}</p>}

      <h3>Prodotti esistenti</h3>
      <ul className="admin-product-list">
        {products.map((p) => (
          <li key={p._id}>
            {p.name} — €{p.price}
            <button onClick={() => handleDelete(p._id)}>Elimina</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanel;