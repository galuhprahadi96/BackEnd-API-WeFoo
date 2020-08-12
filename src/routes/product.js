const route = require("express").Router();
const {
  getAllProduct,
  getProductById,
  postProduct,
} = require("../controller/product");

// GET
route.get("/", getAllProduct);
route.get("/:id", getProductById);

// POST
route.post("/", postProduct);

module.exports = route;
