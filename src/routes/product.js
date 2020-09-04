const route = require("express").Router();
const {
  getSearchProduct,
  getAllProduct,
  getProductById,
  postProduct,
  putProduct,
  deleteProduct,
} = require("../controller/product");

const { authorization } = require("../middleware/Auth");
const {
  clearDataProductRedis,
  getProductRedis,
  getProductByIdRedis,
} = require("../middleware/Redis");

// Search by name
route.get("/search", authorization, getSearchProduct);
// GET
route.get("/", authorization, getProductRedis, getAllProduct);
route.get("/:id", authorization, getProductByIdRedis, getProductById);

// POST
route.post("/", authorization, clearDataProductRedis, postProduct);

// PUT
route.put("/:id", authorization, clearDataProductRedis, putProduct);

// DELETE
route.delete("/:id", authorization, clearDataProductRedis, deleteProduct);

module.exports = route;
