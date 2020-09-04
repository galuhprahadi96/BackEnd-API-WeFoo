const route = require("express").Router();
const {
  getSearchProduct,
  getAllProduct,
  getProductById,
  postProduct,
  putProduct,
  deleteProduct,
} = require("../controller/product");

const { authAll, authAdmin } = require("../middleware/Auth");
const {
  clearDataProductRedis,
  getProductRedis,
  getProductByIdRedis,
} = require("../middleware/Redis");

// Search by name
route.get("/search", authAll, getSearchProduct);
// GET
route.get("/", authAll, getProductRedis, getAllProduct);
route.get("/:id", authAll, getProductByIdRedis, getProductById);

// POST
route.post("/", authAdmin, clearDataProductRedis, postProduct);

// PUT
route.put("/:id", authAdmin, clearDataProductRedis, putProduct);

// DELETE
route.delete("/:id", authAdmin, clearDataProductRedis, deleteProduct);

module.exports = route;
