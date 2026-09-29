const express = require('express'); //importo funzioni del controller per poterle usare in questo file
const router = express.Router();
const { getAllProducts, getProductById } = require('../controllers/productController');

router.get('/', getAllProducts);       // GET /api/products
router.get('/:id', getProductById);    // GET /api/products/5

module.exports = router;