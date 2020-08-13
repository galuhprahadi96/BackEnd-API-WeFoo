// import data model product
const { getAllCategory, getCategoryById } = require("../model/category");

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

  // ambil data category by id
  getCategoryById: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await getCategoryById(id);
      if (result.length > 0) {
        return helper.response(res, 200, "Success Get Category Id", result);
      } else {
        return helper.response(res, 404, `Category id = ${id} not Found`);
      }
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },
};
