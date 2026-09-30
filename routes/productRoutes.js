const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const protect = require('../middleware/authMiddleware');

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', protect, createProduct);      // ora richiede il token
router.put('/:id', protect, updateProduct);    // ora richiede il token
router.delete('/:id', protect, deleteProduct); // ora richiede il token

module.exports = router;