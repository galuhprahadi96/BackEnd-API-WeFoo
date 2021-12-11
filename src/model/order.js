const connection = require("../config/mysql");

module.exports = {
  getHarga: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT product_price FROM product WHERE product_id = ${id}`,
        (error, result) => {
          // let newResult = JSON.parse(JSON.stringify(result));
          !error ? resolve(result.rows) : reject(new Error(error));
        }
      );
    });
  },

  getOrderById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT history_id, product_name, order_qty, order_total FROM order_product LEFT JOIN product ON order_product.product_id=product.product_id WHERE history_id = $1",
        [id],
        (error, result) => {
          !error ? resolve(result.rows) : reject(new Error(error));
        }
      );
    });
  },

  postOrder: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO order_product (history_id, product_id,order_qty,order_total) VALUES ($1, $2, $3, $4)",
        [setData.history_id, setData.product_id, setData.order_qty, setData.order_total],
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
