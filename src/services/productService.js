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
  if (productName === undefined || !productName) {
    return { type: 400, message: '"name" is required' };
  }
  
  if (productName.length < 5) {
    return { type: 422, message: '"name" length must be at least 5 characters long' };
  }
  const productInserted = await modelProduct.insertProduct(productName);

  return { type: null, message: productInserted };
};

const updateProduct = async (id, productName) => {
  if (productName === undefined || !productName) {
    return { type: 400, message: { message: '"name" is required' } };
  }
  
  if (productName.length < 5) {
    return { type: 422, message: { message: '"name" length must be at least 5 characters long' } };
  }

  const updatedProduct = await modelProduct.updateProduct(id, productName);

  if (updatedProduct.changedRows === 0) {
    return { type: 404, message: { message: 'Product not found' } };
  }
  
  return { type: 200, message: { id, name: productName } };
};

const deleteProduct = async (id) => {
  console.log('entrou no delete service');
  const deletedProduct = await modelProduct.deleteProduct(id);

  if (deletedProduct.affectedRows === 0) {
    return { type: 404, message: { message: 'Product not found' } };
  }
  
  return { type: 204, message: '' };
};

module.exports = { getAllProducts, getProductById, insertProduct, updateProduct, deleteProduct };
