// import data model product
const {
  getAllCategory,
  getCategoryById,
  postCategory,
  patchCategory,
  deleteCategory,
} = require("../model/category");

const helper = require("../helper/index.js");
const redis = require("redis");
const client = redis.createClient();

module.exports = {
  getAllCategory: async (req, res) => {
    try {
      const result = await getAllCategory();

      client.setex("getcategory", 3600, JSON.stringify(result));
      return helper.response(res, 200, "Success Get Category", result);
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },

  getCategoryById: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await getCategoryById(id);
      if (result.length > 0) {
        client.setex(`getcategorybyid:${id}`, 3600, JSON.stringify(result));
        return helper.response(res, 200, "Success Get Category Id", result);
      } else {
        return helper.response(res, 404, `Category id = ${id} not Found`);
      }
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },

  postCategory: async (req, res) => {
    try {
      const { category_name } = req.body;
      const setData = {
        category_name,
        category_created_at: new Date(),
      };

      if (category_name === "") {
        return helper.response(res, 400, `values has insert`);
      } else {
        const result = await postCategory(setData);
        return helper.response(res, 201, "Category Created", result);
      }
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },

  patchCategory: async (req, res) => {
    try {
      const id = req.params.id;
      const { category_name } = req.body;

      const setData = {
        category_name,
        category_update_at: new Date(),
      };
      const checkId = await getCategoryById(id);
      if (checkId.length > 0) {
        if (category_name === "") {
          return helper.response(res, 400, `values has insert`);
        } else {
          const result = await patchCategory(setData, id);
          return helper.response(res, 201, "Category Updated", result);
        }
      } else {
        return helper.response(res, 404, `Category Id : ${id} Not Found`);
      }
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const id = req.params.id;
      const checkId = await getCategoryById(id);
      if (checkId.length > 0) {
        const result = await deleteCategory(id);
        return helper.response(res, 201, "Category Deleted", result);
      } else {
        return helper.response(res, 404, `Category id : ${id} not found`);
      }
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },
};
