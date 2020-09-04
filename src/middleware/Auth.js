const jwt = require("jsonwebtoken");
const helper = require("../helper/index.js");

module.exports = {
  // auth untuk all user
  authAll: (request, response, next) => {
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

  // auth untuk admin
  authAdmin: (request, response, next) => {
    let token = request.headers.authorization;

    // cek token
    if (token) {
      token = token.split(" ")[1];
      jwt.verify(token, "RAHASIA", (error, result) => {
        // jika error
        if (
          (error && error.name === "jsonwebTokenError") ||
          (error && error.name === "TokenExpiredError")
        ) {
          return helper.response(response, 403, error.message);
        } else {
          // cek role
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
