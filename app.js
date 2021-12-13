require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const routerNavigation = require("./src");

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.static("uploads"));

app.use((request, response, next) => {
response.header("Access-Control-Allow-Origin", "*");
response.header(
"Access-Control-Allow-Headers",
    "Origin, X-Request-With, Content-Type, Accept, Authorization"
   );
   next();
 });
app.use(cors());
app.use("/", routerNavigation);

app.get("*", (request, response) => {
  response.status(404).send("Path Not Found !");
});

app.listen(127.0.0.1, 3001, () => {
  console.log(
    `Express app is listening on host: 127.0.0.1 and port: 3001`
  );
});
