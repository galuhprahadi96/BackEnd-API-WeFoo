const route = require("express").Router();

const { getAllHistory, getHistoryById } = require("../controller/history");

// GET
route.get("/", getAllHistory);
route.get("/:id", getHistoryById);

module.exports = route;
