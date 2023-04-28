const modelSales = require('../models/salesModel');

const checkProductId = async (req, res, next) => {
  const sales = req.body;
  const hasntProductID = sales
  .some(({ productId }) => productId === undefined || productId.length === 0); // se true, deu erro
  if (hasntProductID) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  return next();
};

const checkQuantity = (req, res, next) => {
  const sales = req.body;
  const hasntQuantity = sales
  .some(({ quantity }) => quantity === undefined || quantity.length === 0); // se true, deu erro
  
  const hasQuantityEqualToZero = sales
  .some(({ quantity }) => quantity <= 0); // se true, deu erro

  if (hasntQuantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  
  if (hasQuantityEqualToZero) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  return next();
};

const checkExistence = async (req, res, next) => {
  const sales = req.body;
  
  const validIds = await modelSales.checkValidIds();
  const validIdsNumber = validIds.map((id) => Number(id));

  const hasProductIdInexistent = sales
    .every(({ productId }) => validIdsNumber.includes(productId)); // se true, deu certo
  
  if (!hasProductIdInexistent) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return next();
};

module.exports = { checkProductId, checkQuantity, checkExistence };
