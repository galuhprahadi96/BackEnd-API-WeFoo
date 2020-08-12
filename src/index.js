const route = require("express").Router();

// import route
const product = require("./routes/product");

// middle
route.use("/product", product);

module.exports = route;
