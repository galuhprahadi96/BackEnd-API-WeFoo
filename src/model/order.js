const connection = require("../config/mysql");

module.exports = {
  // ambil data harga
  getHarga: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT product_price FROM product WHERE product_id = ${id}`,
        (error, result) => {
          let newResult = JSON.parse(JSON.stringify(result));
          !error ? resolve(newResult) : reject(new Error(error));
        }
      );
    });
  },

  // ambil history by id
  getOrderById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT history_id, product_name, order_qty, order_total FROM order_product LEFT JOIN product ON order_product.product_id=product.product_id WHERE history_id = ?",
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },

  // post order
  postOrder: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO order_product SET ?",
        setData,
        (error, result) => {
          if (!error) {
            const newResult = {
              id_order: result.insertId,
            };
            resolve(newResult);
          } else {
            reject(new Error(error));
          }
        }
      );
    });
  },
};
