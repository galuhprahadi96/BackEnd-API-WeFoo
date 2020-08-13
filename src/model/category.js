const connection = require("../config/mysql");

module.exports = {
  // ambil data Category
  getAllCategory: () => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM category", (error, result) => {
        !error ? resolve(result) : reject(new Error(error));
      });
    });
  },

  // ambil category by id
  getCategoryById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM category WHERE category_id = ?",
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
};
