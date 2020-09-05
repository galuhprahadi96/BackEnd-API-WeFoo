const route = require("express").Router();
const { postOrder } = require("../controller/order");

const { authAll } = require("../middleware/Auth");
const { clearDataHistoryRedis } = require("../middleware/Redis");

// POST
route.post("/", authAll, clearDataHistoryRedis, postOrder);

module.exports = route;
