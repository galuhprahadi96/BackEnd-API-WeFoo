const connection = require("../config/mysql");

module.exports = {
  getProduct: (limit, offset, name, sort) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT product_id, category_name, product_name, product_image, product_price, status, product_created_at, product_update_at FROM product LEFT JOIN category ON product.id_category=category.category_id ORDER BY ${name} ${sort} LIMIT ${limit} OFFSET ${offset}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },

  getProductCount: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT COUNT(*) as total FROM product",
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error));
        }
      );
    });
  },

  getSearchProduct: (keyword) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT product_id, category_name, product_name, product_image, status, product_created_at, product_update_at FROM product INNER JOIN category ON product.id_category=category.category_id WHERE product_name LIKE '%${keyword}%' ORDER BY product_name ASC`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },

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
