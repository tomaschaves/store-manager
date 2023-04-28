const express = require('express');
const productController = require('../controllers/productController');

const productsRouter = express.Router();
productsRouter.get('/', productController.getAllProducts);
productsRouter.get('/:id', productController.getProductById);
productsRouter.post('/', productController.insertProduct);
productsRouter.put('/:id', productController.updateProduct);

module.exports = productsRouter;
