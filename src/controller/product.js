// import data model product
const { getAllProduct, getProductById } = require("../model/product");

// import helper
const helper = require("../helper/index.js");

module.exports = {
  // method ambil data product
  getAllProduct: async (request, response) => {
    try {
      const result = await getAllProduct();
      return helper.response(response, 200, "Success Get Product", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },

  // method ambil data per id
  getProductById: async (request, response) => {
    try {
      const id = request.params.id;
      const result = await getProductById(id);
      if (result.length > 0) {
        return helper.response(
          response,
          200,
          "Success Get Product By ID",
          result
        );
      } else {
        return helper.response(
          response,
          404,
          `Product By Id : ${id} Not Found`
        );
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
};
