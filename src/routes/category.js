const route = require("express").Router();

const {
  getAllCategory,
  getCategoryById,
  postCategory,
  patchCategory,
  deleteCategory,
} = require("../controller/category");

const { authorization } = require("../middleware/Auth");

// GET
route.get("/", getAllCategory);
route.get("/:id", getCategoryById);

// POST
route.post("/", authorization, postCategory);

// PATCH
route.patch("/:id", authorization, patchCategory);

// DELETE
route.delete("/:id", authorization, deleteCategory);
module.exports = route;
