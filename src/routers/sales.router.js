const express = require('express');
const salesController = require('../controllers/salesController');
const { checkProductId, checkQuantity, checkExistence } = require('../middlewares/checkFields');

const salesRouter = express.Router();
salesRouter.post('/', checkProductId, checkQuantity, checkExistence, salesController.insertSales);
salesRouter.get('/', salesController.getAllSales);
salesRouter.get('/:id', salesController.getSpecificSale);

module.exports = salesRouter;
