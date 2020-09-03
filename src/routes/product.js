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

// Search by name
route.get("/search", getSearchProduct);
// GET
route.get("/", getAllProduct);
route.get("/:id", getProductById);

// POST
route.post("/", authorization, postProduct);

// PUT
route.put("/:id", authorization, putProduct);

// DELETE
route.delete("/:id", authorization, deleteProduct);

module.exports = route;
