const route = require("express").Router();

const {
  getAllCategory,
  getCategoryById,
  postCategory,
  patchCategory,
} = require("../controller/category");

// GET
route.get("/", getAllCategory);
route.get("/:id", getCategoryById);

// POST
route.post("/", postCategory);

// PATCH
route.patch("/:id", patchCategory);
module.exports = route;
