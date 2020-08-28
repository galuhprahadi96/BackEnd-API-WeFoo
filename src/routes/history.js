const route = require("express").Router();

const {
  getAllHistory,
  getHistoryById,
  getHistoryOrder,
  getTotalPrice,
  getTotalOrderDay,
} = require("../controller/history");

// GET
route.get("/", getAllHistory);
route.get("/count", getHistoryOrder);
route.get("/total", getTotalPrice);
route.get("/income", getTotalOrderDay);
route.get("/:id", getHistoryById);

module.exports = route;
