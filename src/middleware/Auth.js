const jwt = require("jsonwebtoken");
const helper = require("../helper/index.js");

module.exports = {
  authAll: (request, response, next) => {
    let token = request.headers.authorization;
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

  authAdmin: (request, response, next) => {
    let token = request.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      jwt.verify(token, "RAHASIA", (error, result) => {
        if (
          (error && error.name === "jsonwebTokenError") ||
          (error && error.name === "TokenExpiredError")
        ) {
          return helper.response(response, 403, error.message);
        } else {
          if (result.user_role === 1) {
            request.token = result;
            next();
          } else {
            return helper.response(response, 403, "Access Forbidden");
          }
        }
      });
    } else {
      return helper.response(response, 400, "Please Login First !");
    }
  },
};
