// import data model product
const {
  getAllProduct,
  getProductById,
  postProduct,
} = require("../model/product");

// import helper
const helper = require("../helper/index.js");

module.exports = {
  // method ambil data product
  getAllProduct: async (req, res) => {
    try {
      const result = await getAllProduct();
      return helper.response(res, 200, "Success Get Product", result);
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },

  // method ambil data per id
  getProductById: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await getProductById(id);
      if (result.length > 0) {
        return helper.response(res, 200, "Success Get Product By ID", result);
      } else {
        return helper.response(res, 404, `Product By Id : ${id} Not Found`);
      }
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },

  // method input data
  postProduct: async (req, res) => {
    try {
      const {
        id_category,
        product_name,
        product_image,
        product_price,
        product_created_at,
        status,
      } = req.body;
      const setData = {
        id_category,
        product_name,
        product_image,
        product_price,
        product_created_at: new Date(),
        status,
      };
      const result = await postProduct(setData);
      return helper.response(res, 201, "Product Created", result);
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },
};
