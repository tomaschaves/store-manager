const modelProduct = require('../models/productModel');

const getAllProducts = async () => {
  const allProducts = await modelProduct.getAllProducts();
  
  return { type: null, message: allProducts };
};

const getProductById = async (id) => {
  const productById = await modelProduct.getProductById(id);

  if (!productById) {
    return { type: 404, message: 'Product not found' };
  }

  return { type: null, message: productById };
};

module.exports = { getAllProducts, getProductById };
