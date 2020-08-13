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

  // input data category
  postCategory: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO category SET ?",
        setData,
        (error, result) => {
          if (!error) {
            const newResult = {
              category_id: result.insertId,
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

  // update category
  patchCategory: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE category SET ? WHERE category_id = ?",
        [setData, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              category_id: id,
              ...setData,
            };
            // console.log(newResult);
            resolve(newResult);
          } else {
            reject(new Error(error));
          }
        }
      );
    });
  },

  // delete data category

  deleteCategory: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM category WHERE category_id = ?",
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
