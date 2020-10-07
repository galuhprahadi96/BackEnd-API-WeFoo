const route = require("express").Router();

const {
  getAllCategory,
  getCategoryById,
  postCategory,
  patchCategory,
  deleteCategory,
} = require("../controller/category");

const { authAll, authAdmin } = require("../middleware/Auth");

route.get("/", authAll, getAllCategory);
route.get("/:id", authAll, getCategoryById);
route.post("/", authAdmin, postCategory);
route.patch("/:id", authAdmin, patchCategory);
route.delete("/:id", authAdmin, deleteCategory);

module.exports = route;
