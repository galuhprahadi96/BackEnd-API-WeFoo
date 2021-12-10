const connection = require("../config/mysql");

module.exports = {
  getAllHistory: (limit, offset) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT history.history_id, history.invoice, history.subtotal, history.history_created_at,history.user_id , users.user_name FROM history LEFT JOIN users ON history.user_id=users.user_id ORDER BY history_created_at DESC LIMIT ${limit} OFFSET ${offset}`,
        (error, result) => {
          !error ? resolve(result.rows) : reject(new Error(error));
        }
      );
    });
  },

  getHistoryByInvoice: (invoice) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM history WHERE invoice = $1",
        [invoice],
        (error, result) => {
          !error ? resolve(result.rows[0]) : reject(new Error(error));
        }
      );
    });
  },

  getHistoryById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM history WHERE history_id = $1",
        [id],
        (error, result) => {
          !error ? resolve(result.rows) : reject(new Error(error));
        }
      );
    });
  },

  countHistory: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT COUNT(*) as total FROM history",
        (error, result) => {
          !error ? resolve(result.rows[0].total) : reject(new Error(error));
        }
      );
    });
  },

  countHistoryOrder: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT COUNT(*) as orders FROM history WHERE YEARWEEK(history_created_at, ) = YEARWEEK(now())",
        (error, result) => {
          console.log(error)
          !error ? resolve(result.rows[0].orders) : reject(new Error(error));
        }
      );
    });
  },

  countTotalPriceOrder: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT SUM(subtotal) AS totalPrice FROM history WHERE YEAR(history_created_at) = YEAR(NOW())",
        (error, result) => {
          // console.log(error)
          !error ? resolve(result.rows[0].totalPrice) : reject(new Error(error));
        }
      );
    });
  },

  countTotalPrice: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT SUM(subtotal) AS PriceOrders FROM history WHERE DATE(history_created_at) = DATE(NOW())",
        (error, result) => {
          // console.log(error)
          !error ? resolve(result.rows[0].PriceOrders) : reject(new Error(error));
        }
      );
    });
  },

  getHistoryChart: (date) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT DATE(history_created_at) AS date, SUM(subtotal) AS sum FROM history WHERE MONTH(history_created_at) = MONTH(NOW()) AND YEAR(history_created_at) = YEAR(NOW()) GROUP BY DATE(history_created_at)`,
        (error, result) => {
          // console.log(error)
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },

  postHistory: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO history (user_id, invoice) VALUES ($1, $2)",
        [setData.user_id, setData.invoice],
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

  patchHistory: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE history SET subtotal = $1, history_created_at = $2 WHERE history_id = $3`,
        [setData.subtotal, setData.history_created_at, id],
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
