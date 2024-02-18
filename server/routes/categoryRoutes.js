const express = require('express');
const {createCategory ,getCategories, getCategory} = require('../controllers/categoryController');
//const extract = require('../middleware/extractToken');
const router = express.Router();

router.post('/create-Category', createCategory);
router.get('/get-Category', getCategories);
router.get('/get-Categorydata', getCategory);

module.exports = router