const route = require("express").Router();

const {
  getAllCategory,
  getCategoryById,
  postCategory,
  patchCategory,
  deleteCategory,
} = require("../controller/category");

const { authorization } = require("../middleware/Auth");
const {
  clearDataCategoryRedis,
  getCategoryRedis,
  getCategoryByIdRedis,
} = require("../middleware/Redis");

// GET
route.get("/", authorization, getCategoryRedis, getAllCategory);
route.get("/:id", authorization, getCategoryByIdRedis, getCategoryById);

// POST
route.post("/", authorization, clearDataCategoryRedis, postCategory);

// PATCH
route.patch("/:id", authorization, clearDataCategoryRedis, patchCategory);

// DELETE
route.delete("/:id", authorization, clearDataCategoryRedis, deleteCategory);
module.exports = route;
