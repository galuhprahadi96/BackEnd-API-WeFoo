const route = require("express").Router();
const { postOrder } = require("../controller/order");

const { authorization } = require("../middleware/Auth");

// POST
route.post("/", authorization, postOrder);

module.exports = route;
