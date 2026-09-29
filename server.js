require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.send('Il server di ShopDemo funziona!');
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connesso a MongoDB!');
    app.listen(PORT, () => {
      console.log(`Server avviato su http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Errore di connessione a MongoDB:', err.message);
  });