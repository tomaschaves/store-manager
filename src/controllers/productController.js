const serviceProduct = require('../services/productService');

const getAllProducts = async (req, res) => {
  const { type, message } = await serviceProduct.getAllProducts();
  if (type) return res.status(type).json({ message });
  
  return res.status(200).json(message);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await serviceProduct.getProductById(id);

  if (type) return res.status(type).json({ message });
  
  return res.status(200).json(message);
};

const insertProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await serviceProduct.insertProduct(name);

  if (type) return res.status(type).json({ message });

  return res.status(201).json(message);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { type, message } = await serviceProduct.updateProduct(Number(id), name);

  return res.status(type).json(message);
}; 

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await serviceProduct.deleteProduct(Number(id));

  if (type === 404) {
    return res.status(type).json(message);
  }
  return res.status(type).end();
}; 

module.exports = { getAllProducts, getProductById, insertProduct, updateProduct, deleteProduct };
