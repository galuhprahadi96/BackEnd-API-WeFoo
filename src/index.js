const route = require("express").Router();

// import route disini
const product = require("./routes/product");
// const category = ....

// buat middle disini
route.use("/product", product);
// route.use('/category', product)

module.exports = route;
