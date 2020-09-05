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
const uploadFilter = require("../middleware/Multer");
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
route.post("/", authAdmin, clearDataProductRedis, uploadFilter, postProduct);

// PUT
route.put("/:id", authAdmin, clearDataProductRedis, uploadFilter, putProduct);

// DELETE
route.delete("/:id", authAdmin, clearDataProductRedis, deleteProduct);

module.exports = route;
