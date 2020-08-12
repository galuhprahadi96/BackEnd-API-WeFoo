const route = require("express").Router();
const {
  getAllProduct,
  getProductById,
  postProduct,
  putProduct,
  deleteProduct,
} = require("../controller/product");

// GET
route.get("/", getAllProduct);
route.get("/:id", getProductById);

// POST
route.post("/", postProduct);

// PUT
route.put("/:id", putProduct);

// DELETE
route.delete("/:id", deleteProduct);

module.exports = route;
