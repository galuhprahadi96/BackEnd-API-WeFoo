const connection = require("../config/mysql");

module.exports = {
  // ambil semua data product
  getAllProduct: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT product_id, category_name, product_name, product_image, status, product_created_at, product_update_at FROM product INNER JOIN category ON product.id_category=category.category_id`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },

  // ambil data product dengan id tertentu
  getProductById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT product_id, category_name, product_name, product_image, status, product_created_at, product_update_at FROM product INNER JOIN category ON product.id_category=category.category_id WHERE product_id = ?",
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },

  // input data product
  postProduct: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO product SET ?",
        setData,
        (error, result) => {
          if (!error) {
            const newResult = {
              product_id: result.insertId,
              ...setData,
            };
            resolve(newResult);
          } else {
            reject(new Error(error));
          }
        }
      );
    });
  },

  // update data product

  putProduct: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE product SET ? WHERE product_id = ?",
        [setData, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              product_id: id,
              ...setData,
            };
            resolve(newResult);
          } else {
            reject(new Error(error));
          }
        }
      );
    });
  },

  // delete data product

  deleteProduct: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM product WHERE product_id = ?",
        id,
        (error, result) => {
          if (!error) {
            const newResult = {
              id: id,
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
