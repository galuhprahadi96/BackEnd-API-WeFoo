const redis = require("redis");
const client = redis.createClient();
const helper = require("../helper/index");

module.exports = {
  // product
  getProductRedis: (request, response, next) => {
    client.get(
      `getproduct:${JSON.stringify(request.query)}`,
      (error, result) => {
        const newResult = JSON.parse(result);
        if (!error && result !== null) {
          return helper.response(
            response,
            200,
            "Success Get All Product",
            newResult.result,
            newResult.pageInfo
          );
        } else {
          next();
        }
      }
    );
  },

  getProductByIdRedis: (request, response, next) => {
    const { id } = request.params;
    client.get(`getproductbyid:${id}`, (error, result) => {
      if (!error && result !== null) {
        return helper.response(
          response,
          200,
          `Success get product by id ${id}`,
          JSON.parse(result)
        );
      } else {
        next();
      }
    });
  },

  clearDataProductRedis: (request, response, next) => {
    client.keys("getproduct*", (error, keys) => {
      keys.forEach((value) => {
        client.del(value);
      });

      next();
    });
  },

  // category
  getCategoryRedis: (request, response, next) => {
    client.get("getcategory", (error, result) => {
      if (!error && result !== null) {
        return helper.response(
          response,
          200,
          `Success get category`,
          JSON.parse(result)
        );
      } else {
        next();
      }
    });
  },

  getCategoryByIdRedis: (request, response, next) => {
    const { id } = request.params;
    client.get(`getcategorybyid:${id}`, (error, result) => {
      if (!error && result !== null) {
        return helper.response(
          response,
          200,
          `Success Get Category By Id ${id}`,
          JSON.parse(result)
        );
      } else {
        next();
      }
    });
  },

  clearDataCategoryRedis: (request, response, next) => {
    client.keys("getcategory*", (error, keys) => {
      keys.forEach((value) => {
        client.del(value);
      });

      next();
    });
  },

  // history orders
  getHistoryRedis: (request, response, next) => {
    client.get(
      `gethistory:${JSON.stringify(request.query)}`,
      (error, result) => {
        const newResult = JSON.parse(result);
        if (!error && result !== null) {
          return helper.response(
            response,
            200,
            "Success Get History",
            newResult.result,
            newResult.pageInfo
          );
        } else {
          next();
        }
      }
    );
  },

  getHistoryIdRedis: (request, response, next) => {
    const { id } = request.params;
    client.get(`gethistorybyid:${id}`, (error, result) => {
      if (!error && result !== null) {
        return helper.response(
          response,
          200,
          `Success Get history id ${id}`,
          JSON.parse(result)
        );
      } else {
        next();
      }
    });
  },

  clearDataHistoryRedis: (request, response, next) => {
    client.keys("gethistory*", (error, keys) => {
      keys.forEach((value) => {
        client.del(value);
      });

      next();
    });
  },
};
