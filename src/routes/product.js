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

route.get("/search", authAll, getSearchProduct);
route.get("/", authAll,  getAllProduct);
route.get("/:id", authAll,  getProductById);
route.post("/", authAdmin,  uploadFilter, postProduct);
route.put("/:id", authAdmin,  uploadFilter, putProduct);
route.delete("/:id", authAdmin,  deleteProduct);

module.exports = route;
