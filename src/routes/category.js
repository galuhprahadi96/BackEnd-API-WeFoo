const route = require("express").Router();

const { getAllCategory } = require("../controller/category");

// GET
route.get("/", getAllCategory);

module.exports = route;
