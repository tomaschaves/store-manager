const serviceSales = require('../services/salesService');

const insertSales = async (req, res) => {
  const sales = req.body;
  const saleId = await serviceSales.insertSales();
  
  const { type, message } = await serviceSales.insertSaleProducts(saleId, sales);

  return res.status(type).json(message);
};

const getAllSales = async (_req, res) => {
  const { type, message } = await serviceSales.getAllSales();  
  return res.status(type).json(message);
};

const getSpecificSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await serviceSales.getSpecificSale(Number(id));
  
  return res.status(type).json(message); // tenho que retornar o objeto { "message": "Sale not found" }
};

module.exports = { insertSales, getAllSales, getSpecificSale };
