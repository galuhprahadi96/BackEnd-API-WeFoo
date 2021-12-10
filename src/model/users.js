const connection = require("../config/mysql");

module.exports = {
  postUser: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO users (user_name, user_email, user_password, user_role, user_status, user_created_at) Values ($1, $2, $3, $4, $5, $6)", [setData.user_name, setData.user_email, setData.user_password, setData.user_role, setData.user_status, setData.user_created_at], (error, result) => {
        console.log(result)
        if (!error) {
          const newResult = {
            id: result.rowCount,
            ...setData,
          };
          delete newResult.user_password;
          resolve(newResult);
        } else {
          reject(new Error(error));
        }
      });
    });
  },

  checkUser: (email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT user_id, user_email, user_name, user_password, user_role, user_status FROM users WHERE user_email = $1",
        [email],
        (error, result) => {
          !error ? resolve(result.rows) : reject(new Error(error));
        }
      );
    });
  },

  getAllUser: () => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM users", (error, result) => {
        !error ? resolve(result.rows) : reject(new Error(error));
      });
    });
  },

  getUserById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM users WHERE user_id = $1",
        [id],
        (error, result) => {
          !error ? resolve(result.rows) : reject(new Error(error));
        }
      );
    });
  },

  patchUser: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE users SET user_name = $1, user_email = $2, user_role = $3,user_status = $4, user_updated_at = $5 WHERE user_id = $6", [setData.user_name, setData.user_email, setData.user_role, setData.user_status, setData.user_updated_at, id],
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
        "UPDATE users SET user_password = $1, user_updated_at = $2 WHERE user_id = $3", [setData.user_password, setData.user_updated_at, id],
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
        "DELETE FROM users WHERE user_id = $1",
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
