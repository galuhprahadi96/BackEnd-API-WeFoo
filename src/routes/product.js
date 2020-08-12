const route = require("express").Router();
const { getAllProduct, getProductById } = require("../controller/product");

// GET
route.get("/", getAllProduct);
route.get("/:id", getProductById);

module.exports = route;
