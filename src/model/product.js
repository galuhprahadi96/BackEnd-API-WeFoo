const connection = require("../config/mysql");

module.exports = {
  // ambil semua data product
  getProduct: (limit = 1, offset = 0, name = "product_id", sort = "ASC") => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT product_id, category_name, product_name, product_image,product_price, status, product_created_at, product_update_at FROM product INNER JOIN category ON product.id_category=category.category_id ORDER BY ${name} ${sort} LIMIT ${limit} OFFSET ${offset}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },

  // // ambil semua data product
  // getProduct: (limit = 1, offset = 0) => {
  //   return new Promise((resolve, reject) => {
  //     connection.query(
  //       "SELECT product_id, category_name, product_name, product_image, status, product_created_at, product_update_at FROM product INNER JOIN category ON product.id_category=category.category_id ORDER BY product.product_id ASC LIMIT ? OFFSET ? ",
  //       [limit, offset],
  //       (error, result) => {
  //         !error ? resolve(result) : reject(new Error(error));
  //       }
  //     );
  //   });
  // },

  // hitung jumlah data
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

  // cari data product by name
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
