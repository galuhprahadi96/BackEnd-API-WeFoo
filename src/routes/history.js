const route = require("express").Router();

const { getHistoryById } = require("../controller/history");

// POST
route.get("/:id", getHistoryById);

module.exports = route;
