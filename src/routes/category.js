const route = require("express").Router();

const {
  getAllCategory,
  getCategoryById,
  postCategory,
} = require("../controller/category");

// GET
route.get("/", getAllCategory);
route.get("/:id", getCategoryById);

// POST
route.post("/", postCategory);
module.exports = route;
