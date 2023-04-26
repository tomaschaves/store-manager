const serviceProduct = require('../services/productService');

const getAllProducts = async (req, res) => {
  const { type, message } = await serviceProduct.getAllProducts();
  if (type) return res.status(type).json({ message });
  
  return res.status(200).json(message);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await serviceProduct.getProductById(id);
  if (type) return res.status(404).json({ message });
  
  return res.status(200).json(message);
};

module.exports = { getAllProducts, getProductById };
