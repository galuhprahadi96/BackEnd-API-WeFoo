const route = require("express").Router();

const product = require("./routes/product");
const category = require("./routes/category");
const order = require("./routes/order");
const history = require("./routes/history");
const users = require("./routes/users");

route.use("/product", product);
route.use("/category", category);
route.use("/order", order);
route.use("/history", history);
route.use("/users", users);

module.exports = route;
