const modelProduct = require('../models/productModel');

const getAllProducts = async () => {
  const allProducts = await modelProduct.getAllProducts();
  
  return { type: null, message: allProducts };
};

const getProductById = async (id) => {
  const productById = await modelProduct.getProductById(id);

  if (!productById || productById === undefined) {
    return { type: 404, message: 'Product not found' };
  }

  return { type: null, message: productById };
};

const insertProduct = async (productName) => {
  if (productName.length < 5) {
    return { type: 422, message: '"name" length must be at least 5 characters long' };
  }

  if (productName === undefined || !productName) {
    return { type: 400, message: '"name" is required' };
  }

  const productInserted = await modelProduct.insertProduct(productName);

  return { type: null, message: productInserted };
};

module.exports = { getAllProducts, getProductById, insertProduct };
