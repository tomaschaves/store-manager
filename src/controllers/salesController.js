const serviceSales = require('../services/salesService');

const insertSales = async (req, res) => {
  const sales = req.body;
  const saleId = await serviceSales.insertSales();
  
  const { type, message } = await serviceSales.insertSaleProducts(saleId, sales);

  return res.status(type).json(message);
};

module.exports = { insertSales };
