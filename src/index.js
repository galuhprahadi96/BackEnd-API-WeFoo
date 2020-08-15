const route = require("express").Router();

// import route
const product = require("./routes/product");
const category = require("./routes/category");
const order = require("./routes/order");
const history = require("./routes/history");
// middle
route.use("/product", product);
route.use("/category", category);
route.use("/order", order);
route.use("/history", history);

module.exports = route;
