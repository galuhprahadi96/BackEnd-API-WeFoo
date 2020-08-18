// import data model
const {
  getHistoryById,
  getAllHistory,
  countHistory,
} = require("../model/history");
const { getOrderById } = require("../model/order");

// import helper
const helper = require("../helper/index.js");
const { request } = require("express");

module.exports = {
  getAllHistory: async (req, res) => {
    try {
      const result = await getAllHistory();
      let totalData = await countHistory();
      data = {
        TotalOrder: totalData,
      };
      return helper.response(res, 200, "Success Get history", [result, data]);
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },

  // ambil data
  getHistoryById: async (req, res) => {
    try {
      const id = req.params.id;
      const history = await getHistoryById(id);
      const orders = await getOrderById(id);
      const result = [{ ...history[0], orders }];
      return helper.response(res, 200, `Success Get history id ${id}`, result);
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },
};
