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

const getAllSales = async () => {
  const [result] = await connection.execute(
    `SELECT product.sale_id AS saleId, date, product.product_id AS productId, product.quantity
    FROM StoreManager.sales AS sale, StoreManager.sales_products AS product
    WHERE sale.id = product.sale_id 
    GROUP BY product.sale_id, sale.date, product.product_id, product.quantity
    ORDER BY product.sale_id, product.product_id;`, [],
  );
  return result;
};

const getSpecificSale = async (id) => {
  const [result] = await connection
    .execute(
      `SELECT date, product_id AS productId, quantity
      FROM StoreManager.sales AS sales, StoreManager.sales_products AS sp
      WHERE id = (?) AND sales.id = sp.sale_id;`, [id],
    );
  return result;
};

module.exports = {
  insertSales,
  insertSaleProducts,
  checkIdsFromProducts,
  checkValidIds,
  getAllSales,
  getSpecificSale,
};
