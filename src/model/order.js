const connection = require("../config/mysql");

module.exports = {
  getHarga: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT product_price FROM product WHERE product_id = ${id}`,
        (error, result) => {
          // let newResult = JSON.parse(JSON.stringify(result));
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },

  getOrderById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT history_id, product_name, order_qty, order_total FROM order_product LEFT JOIN product ON order_product.product_id=product.product_id WHERE history_id = ?",
        [id],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },

  postOrder: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO order_product SET ?",
        [setData],
        (error, result) => {

          if (!error) {
            resolve(setData);
          } else {
            reject(new Error(error));
          }
        }
      );
    });
  },
};
