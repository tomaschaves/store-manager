const { checkFields } = require('../middlewares/checkFields');
const modelSales = require('../models/salesModel');
// const modelProduct = require('../models/productModel');

const insertSales = async () => {
  const saleInserted = await modelSales.insertSales();
  return saleInserted.id;
};

const insertSaleProducts = async (saleId, sales) => {
  const validIds = await modelSales.checkValidIds();
  const validIdsNumber = validIds.map((id) => Number(id));
  const hasProductID = sales
  .some(({ productId }) => productId === undefined || productId.length === 0);
  
  const hasQuantity = sales
  .some(({ quantity }) => quantity === undefined || quantity.length === 0);
  
  const hasQuantityEqualToZero = sales
  .some(({ quantity }) => quantity <= 0);
  
  const hasProductIdInexistent = sales
    .every((sale) => validIdsNumber.includes(sale.productId));

  sales.forEach(async (sale) => {
    modelSales.insertSaleProducts(saleId, sale.productId, sale.quantity);
  });
  
  const returnObject = {
    id: saleId,
    itemSold: sales,
  };
  
  return { type: 201, message: returnObject };
};

module.exports = { insertSales, insertSaleProducts };
