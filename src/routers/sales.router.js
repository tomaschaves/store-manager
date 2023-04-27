const express = require('express');
const salesController = require('../controllers/salesController');

const salesRouter = express.Router();
// salesRouter.get('/', productController.getAllProducts);
// productsRouter.get('/:id', productController.getProductById);
salesRouter.post('/', salesController.insertSales);

module.exports = salesRouter;
