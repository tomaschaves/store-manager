const connection = require('./connection');

const insertSales = async () => {
  const [{ insertId }] = await connection
    .execute(' INSERT INTO sales(date) VALUES (NOW());');
  const result = { id: insertId };
  return result;
};

const insertSaleProducts = async (saleId, productId, quantity) => {
  const [result] = await connection
    .execute(' INSERT INTO sales_products(sale_id, product_id, quantity) VALUES (?, ?, ?);',
      [saleId, productId, quantity]);
  return result;
};

const checkIdsFromProducts = async (productId) => {
  const [[{ id }]] = await connection.execute('SELECT id FROM products WHERE id = ?;', [productId]);
  return id;
};

const checkValidIds = async () => {
  const [[result]] = await connection.execute('SELECT GROUP_CONCAT(id) FROM products;', []);
  const valueString = Object.values(result)[0];
  return valueString.split(',');
};

module.exports = { insertSales, insertSaleProducts, checkIdsFromProducts, checkValidIds };
