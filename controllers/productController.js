let products = [
  { id: 1, name: 'Maglietta', price: 19.99 },
  { id: 2, name: 'Scarpe', price: 59.99 },
  { id: 3, name: 'Cappello', price: 14.99 }
];

// Restituisce tutti i prodotti
const getAllProducts = (req, res) => {
  res.json(products);
};

// Restituisce un solo prodotto, cercandolo per id
const getProductById = (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: 'Prodotto non trovato' });
  }
  res.json(product);
};

module.exports = { getAllProducts, getProductById };