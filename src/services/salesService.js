const modelSales = require('../models/salesModel');

const insertSales = async () => {
  const saleInserted = await modelSales.insertSales();
  return saleInserted.id;
};

const insertSaleProducts = async (saleId, sales) => {
  await Promise.all(sales.map((sale) => 
    modelSales.insertSaleProducts(saleId, sale.productId, sale.quantity)));
  
  const returnObject = {
    id: saleId,
    itemsSold: sales,
  };
  
  return { type: 201, message: returnObject };
};

const getAllSales = async () => {
  const sales = await modelSales.getAllSales();
  return { type: 200, message: sales };
};

const getSpecificSale = async (id) => {
  const saleProducts = await modelSales.getSpecificSale(id);
  if (saleProducts.length === 0) return { type: 404, message: { message: 'Sale not found' } };

  return { type: 200, message: saleProducts };
};

module.exports = {
  insertSales,
  insertSaleProducts,
  getAllSales,
  getSpecificSale,
};
