const connection = require('./connection');

const getAllProducts = async () => {
  const [result] = await connection.execute('SELECT * FROM products;', []);
  return result;
};

const getProductById = async (id) => {
  const [[result]] = await connection.execute('SELECT * FROM products WHERE id = ?;', [id]);
  return result;
};

const insertProduct = async (productName) => {
  const [{ insertId }] = await connection
    .execute('INSERT INTO products (name) VALUES (?);', [productName]);
  const result = { id: insertId, name: productName };
  return result;
};

module.exports = { getAllProducts, getProductById, insertProduct };
