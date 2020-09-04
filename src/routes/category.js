const route = require("express").Router();

const {
  getAllCategory,
  getCategoryById,
  postCategory,
  patchCategory,
  deleteCategory,
} = require("../controller/category");

const { authAll, authAdmin } = require("../middleware/Auth");
const {
  clearDataCategoryRedis,
  getCategoryRedis,
  getCategoryByIdRedis,
} = require("../middleware/Redis");

// GET
route.get("/", authAll, getCategoryRedis, getAllCategory);
route.get("/:id", authAll, getCategoryByIdRedis, getCategoryById);

// POST
route.post("/", authAdmin, clearDataCategoryRedis, postCategory);

// PATCH
route.patch("/:id", authAdmin, clearDataCategoryRedis, patchCategory);

// DELETE
route.delete("/:id", authAdmin, clearDataCategoryRedis, deleteCategory);
module.exports = route;
