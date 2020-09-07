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

route.get("/", authAll, getCategoryRedis, getAllCategory);
route.get("/:id", authAll, getCategoryByIdRedis, getCategoryById);
route.post("/", authAdmin, clearDataCategoryRedis, postCategory);
route.patch("/:id", authAdmin, clearDataCategoryRedis, patchCategory);
route.delete("/:id", authAdmin, clearDataCategoryRedis, deleteCategory);

module.exports = route;
