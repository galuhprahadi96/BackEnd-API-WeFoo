const route = require("express").Router();

// import route
const product = require("./routes/product");
const category = require("./routes/category");

// middle
route.use("/product", product);
route.use("/category", category);

module.exports = route;
