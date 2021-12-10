const connection = require("../config/mysql");

module.exports = {
  getAllCategory: () => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM category", (error, result) => {
        !error ? resolve(result.rows) : reject(new Error(error));
      });
    });
  },

  getCategoryById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM category WHERE category_id = $1",
        [id],
        (error, result) => {
          !error ? resolve(result.rows) : reject(new Error(error));
        }
      );
    });
  },

  postCategory: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO category (category_name, category_created_at) VALUES ($1, $2)", [setData.category_name, setData.category_created_at],
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

  patchCategory: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE category SET category_name = $1, category_update_at = $2 WHERE category_id = $3",
        [setData.category_name, setData.category_update_at, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              category_id: id,
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

  deleteCategory: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM category WHERE category_id = $1",
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
