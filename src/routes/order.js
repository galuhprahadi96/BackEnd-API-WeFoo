const route = require("express").Router();
const { postOrder } = require("../controller/order");

const { authAll } = require("../middleware/Auth");

// POST
route.post("/", authAll, postOrder);

module.exports = route;
