const express = require('express');
const { addProduct, getProductsCategory, getProduct, getProducts, updateProduct, deleteProduct, getSearchProduct } = require('../controllers/productController');
//const extract = require('../middleware/extractToken');
const router = express.Router();

router.post('/add-product',addProduct);
router.get('/get-productscat', getProductsCategory);
router.get('/get-product', getProduct);
router.get('/get-user-products', getProducts);
router.post('/update-product',updateProduct);
router.post('/delete-product',deleteProduct);
router.get('/get-search-products', getSearchProduct);


module.exports = router