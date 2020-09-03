const jwt = require("jsonwebtoken");
const helper = require("../helper/index.js");

module.exports = {
  authorization: (request, response, next) => {
    let token = request.headers.authorization;
    // cek token
    if (token) {
      token = token.split(" ")[1];
      jwt.verify(token, "RAHASIA", (error, result) => {
        if (
          (error && error.name === "jsonwebTokenError") ||
          (error && error.name === "TokenExpiredError")
        ) {
          return helper.response(response, 403, error.message);
        } else {
          request.token = result;
          next();
        }
      });
    } else {
      return helper.response(response, 400, "Please Login First !");
    }
  },
};
