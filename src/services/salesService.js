const modelSales = require('../models/salesModel');

const insertSales = async () => {
  const saleInserted = await modelSales.insertSales();
  return saleInserted.id;
};

const insertSaleProducts = async (saleId, sales) => {
  sales.forEach(async (sale) => {
    modelSales.insertSaleProducts(saleId, sale.productId, sale.quantity);
  });
  
  const returnObject = {
    id: saleId,
    itemsSold: sales,
  };
  
  return { type: 201, message: returnObject };
};

module.exports = { insertSales, insertSaleProducts };
