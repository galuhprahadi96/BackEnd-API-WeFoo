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

route.get("/search", authAll, getSearchProduct);
route.get("/", authAll, getProductRedis, getAllProduct);
route.get("/:id", authAll, getProductByIdRedis, getProductById);
route.post("/", authAdmin, clearDataProductRedis, uploadFilter, postProduct);
route.put("/:id", authAdmin, clearDataProductRedis, uploadFilter, putProduct);
route.delete("/:id", authAdmin, clearDataProductRedis, deleteProduct);

module.exports = route;
