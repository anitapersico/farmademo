import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { CATEGORIES } from '../constants';

function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [editingId, setEditingId] = useState(null);
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

  if (!token) {
    return <Navigate to="/login" />;
  }

  const resetForm = () => {
    setName('');
    setPrice('');
    setDescription('');
    setImage('');
    setCategory('');
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const isEditing = editingId !== null;
    const url = isEditing
      ? `http://localhost:3000/api/products/${editingId}`
      : 'http://localhost:3000/api/products';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, price: parseFloat(price), description, image, category }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Errore nel salvataggio del prodotto');
        return;
      }

      resetForm();
      loadProducts();
    } catch (err) {
      setError('Errore di connessione al server');
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description || '');
    setImage(product.image || '');
    setCategory(product.category || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (editingId === id) resetForm();
      loadProducts();
    } catch (err) {
      setError('Errore nella cancellazione');
    }
  };

  return (
    <div className="admin-panel">
      <h2>{editingId ? 'Modifica prodotto' : 'Pannello Admin'}</h2>

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
        <input
          type="url"
          placeholder="Link immagine (opzionale, es. https://...)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">Seleziona categoria</option>
          {CATEGORIES.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.label}</option>
          ))}
        </select>
        <div className="admin-form-buttons">
          <button type="submit">{editingId ? 'Salva modifiche' : 'Aggiungi prodotto'}</button>
          {editingId && (
            <button type="button" onClick={resetForm} className="cancel-btn">
              Annulla
            </button>
          )}
        </div>
      </form>
      {error && <p className="error">{error}</p>}

      <h3>Prodotti esistenti</h3>
      <ul className="admin-product-list">
        {products.map((p) => (
          <li key={p._id}>
            <span>{p.name} — €{p.price}</span>
            <span className="admin-product-actions">
              <button onClick={() => handleEdit(p)} className="edit-btn">Modifica</button>
              <button onClick={() => handleDelete(p._id)}>Elimina</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanel;