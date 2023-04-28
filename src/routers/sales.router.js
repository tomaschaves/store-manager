const express = require('express');
const salesController = require('../controllers/salesController');
const { checkProductId, checkQuantity, checkExistence } = require('../middlewares/checkFields');

const salesRouter = express.Router();
salesRouter.post('/', checkProductId, checkQuantity, checkExistence, salesController.insertSales);

module.exports = salesRouter;
