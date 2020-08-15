const route = require("express").Router();
const { postOrder } = require("../controller/order");

// POST
route.post("/", postOrder);

module.exports = route;
