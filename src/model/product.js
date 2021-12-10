const connection = require("../config/mysql");

module.exports = {
  getProduct: (limit, offset, name, sort) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT product_id, category.category_id, category_name, product_name, product_image, product_price, status, product_created_at, product_update_at FROM product LEFT JOIN category ON product.id_category=category.category_id ORDER BY ${name} ${sort} LIMIT ${limit} OFFSET ${offset}`,
        (error, result) => {
          !error ? resolve(result.rows) : reject(new Error(error));
        }
      );
    });
  },

  getProductCount: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT COUNT(*) as total FROM product",
        (error, result) => {
          // console.log(result)
          !error ? resolve(result.rows[0].total) : reject(new Error(error));
        }
      );
    });
  },

  getSearchProduct: (keyword) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT product_id, category_name, product_name, product_image, product_price, status, product_created_at, product_update_at FROM product INNER JOIN category ON product.id_category=category.category_id WHERE product_name LIKE '%${keyword}%' ORDER BY product_name ASC`,
        (error, result) => {
          !error ? resolve(result.rows) : reject(new Error(error));
        }
      );
    });
  },

  getProductById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT product_id, category.category_id, category.category_name, product_name, product_image, status, product_created_at, product_update_at FROM product INNER JOIN category ON product.id_category=category.category_id WHERE product_id = $1",
        [id],
        (error, result) => {
          !error ? resolve(result.rows) : reject(new Error(error));
        }
      );
    });
  },

  postProduct: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO product (id_category, product_name, product_image, product_price, product_created_at, status) VALUES ($1, $2, $3, $4, $5, $6)",
        [setData.id_category, setData.product_name, setData.product_image, setData.product_price, setData.product_created_at, setData.status],
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

  putProduct: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE product SET id_category = $1, product_name = $2, product_image = $3, product_price = $4, product_update_at = $5, status = $6 WHERE product_id = $7",
        [setData.id_category, setData.product_name, setData.product_image, setData.product_price, setData.product_update_at, setData.status, id],
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
        "DELETE FROM product WHERE product_id = $1",
        [id],
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
