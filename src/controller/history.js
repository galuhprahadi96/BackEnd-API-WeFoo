// import data model
const { getHistoryById } = require("../model/history");
const { getOrderById } = require("../model/order");

// import helper
const helper = require("../helper/index.js");
const { request } = require("express");

module.exports = {
  // ambil data
  getHistoryById: async (req, res) => {
    try {
      const id = req.params.id;
      const history = await getHistoryById(id);
      const orders = await getOrderById(id);
      const result = [{ ...history[0], orders }];
      return helper.response(res, 200, "success", result);
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },
};
