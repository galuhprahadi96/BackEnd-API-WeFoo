const route = require("express").Router();

const { getAllCategory, getCategoryById } = require("../controller/category");

// GET
route.get("/", getAllCategory);
route.get("/:id", getCategoryById);
module.exports = route;
