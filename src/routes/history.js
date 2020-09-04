const route = require("express").Router();

const {
  getAllHistory,
  getHistoryById,
  getHistoryOrder,
  getTotalPrice,
  getTotalOrderDay,
} = require("../controller/history");

const { authAll } = require("../middleware/Auth");

// GET
route.get("/", authAll, getAllHistory);
route.get("/count", authAll, getHistoryOrder);
route.get("/total", authAll, getTotalPrice);
route.get("/income", authAll, getTotalOrderDay);
route.get("/:id", authAll, getHistoryById);

module.exports = route;
