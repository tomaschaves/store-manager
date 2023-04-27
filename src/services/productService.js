const modelProduct = require('../models/productModel');

const getAllProducts = async () => {
  const allProducts = await modelProduct.getAllProducts();
  // console.log('service', allProducts);
  
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
  if (productName.length === 0 || productName === undefined || !productName) {
    return { type: 404, message: 'Product must be a valid string' };
  }

  const productInserted = await modelProduct.insertProduct(productName);

  return { type: null, message: productInserted };
};

module.exports = { getAllProducts, getProductById, insertProduct };
