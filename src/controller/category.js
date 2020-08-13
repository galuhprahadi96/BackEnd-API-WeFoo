// import data model product
const { getAllCategory } = require("../model/category");

// import helper
const helper = require("../helper/index.js");
const { request } = require("express");

module.exports = {
  // ambil data category
  getAllCategory: async (req, res) => {
    try {
      const result = await getAllCategory();
      return helper.response(res, 200, "Success Get Category", result);
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },
};
