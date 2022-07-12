const connection = require("../config/mysql");

module.exports = {
  postUser: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO users SET ?", [setData], (error, result) => {
        if (!error) {
          delete setData.user_password;
          resolve(setData);
        } else {
          reject(new Error(error));
        }
      });
    });
  },

  checkUser: (email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT user_id, user_email, user_name, user_password, user_role, user_status FROM users WHERE user_email = ?",
        [email],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },

  getAllUser: () => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM users", (error, result) => {
        !error ? resolve(result) : reject(new Error(error));
      });
    });
  },

  getUserById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM users WHERE user_id = ?",
        [id],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },

  patchUser: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE users SET ? WHERE user_id = ?", [setData, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              user_id: id,
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

  patchPasswordUser: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE users SET ? WHERE user_id = ?", [setData, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              user_id: id,
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

  deleteUser: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM users WHERE user_id = ?",
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
