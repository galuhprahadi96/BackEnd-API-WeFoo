const route = require("express").Router();

const {
  getAllHistory,
  getHistoryById,
  getHistoryOrder,
  getTotalPrice,
  getTotalOrderDay,
  getHistoryChart,
} = require("../controller/history");

const { authAll } = require("../middleware/Auth");
const { getHistoryRedis, getHistoryIdRedis } = require("../middleware/Redis");

route.get("/", authAll, getHistoryRedis, getAllHistory);
route.get("/count", authAll, getHistoryOrder);
route.get("/total", authAll, getTotalPrice);
route.get("/income", authAll, getTotalOrderDay);
route.get("/chart", authAll, getHistoryChart);
route.get("/:id", authAll, getHistoryIdRedis, getHistoryById);

module.exports = route;
