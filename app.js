const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
// ===================================
const routerNavigation = require("./src");
// ===================================

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

// ===================================
app.use("/", routerNavigation);
// ===================================

app.get("*", (request, response) => {
  response.status(404).send("Path Not Found !");
});

app.listen(3001, "127.0.0.1", () => {
  console.log("Express app is listening on host: 127.0.0.1 and port: 3001");
});
