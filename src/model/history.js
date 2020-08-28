const connection = require("../config/mysql");

module.exports = {
  // ambil data history
  getAllHistory: (limit, offset) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM history ORDER BY history_created_at DESC LIMIT ${limit} OFFSET ${offset}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },

  // ambil history by id
  getHistoryById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM history WHERE history_id = ?",
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },

  // hitung jumlah data
  countHistory: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT COUNT(*) as total FROM history",
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error));
        }
      );
    });
  },

  // hitung total order per minggu
  countHistoryOrder: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT COUNT(*) as orders FROM history WHERE YEARWEEK(history_created_at) = YEARWEEK(now())",
        (error, result) => {
          !error ? resolve(result[0].orders) : reject(new Error(error));
        }
      );
    });
  },

  // hitung total order per tahun
  countTotalPriceOrder: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT SUM(subtotal) AS totalPrice FROM history WHERE YEAR(history_created_at) = YEAR(NOW())",
        (error, result) => {
          !error ? resolve(result[0].totalPrice) : reject(new Error(error));
        }
      );
    });
  },

  // hitung total price hari ini
  countTotalPrice: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT SUM(subtotal) AS PriceOrders FROM history WHERE DATE(history_created_at) = DATE(NOW())",
        (error, result) => {
          !error ? resolve(result[0].PriceOrders) : reject(new Error(error));
        }
      );
    });
  },

  // method post history
  postHistory: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO history SET ?",
        setData,
        (error, result) => {
          if (!error) {
            const newResult = {
              history_id: result.insertId,
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

  // update
  patchHistory: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE history SET ? WHERE history_id = ?`,
        [setData, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              history_id: id,
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
};
