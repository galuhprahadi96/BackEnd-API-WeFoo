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
          console.log("ada dalam redis");
          return helper.response(
            response,
            200,
            "Success Get All Product",
            newResult.result,
            newResult.pageInfo
          );
        } else {
          console.log("belum ada didalam redis");
          next();
        }
      }
    );
  },

  getProductByIdRedis: (request, response, next) => {
    const { id } = request.params;
    client.get(`getproductbyid:${id}`, (error, result) => {
      if (!error && result !== null) {
        console.log("ada dalam redis");
        return helper.response(
          response,
          200,
          `Success get product by id ${id}`,
          JSON.parse(result)
        );
      } else {
        console.log("belum ada didalam redis");
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
        console.log("ada dalam redis");
        return helper.response(
          response,
          200,
          `Success get category`,
          JSON.parse(result)
        );
      } else {
        console.log("belum ada didalam redis");
        next();
      }
    });
  },

  getCategoryByIdRedis: (request, response, next) => {
    const { id } = request.params;
    client.get(`getcategorybyid:${id}`, (error, result) => {
      if (!error && result !== null) {
        console.log("ada dalam redis");
        return helper.response(
          response,
          200,
          `Success Get Category By Id ${id}`,
          JSON.parse(result)
        );
      } else {
        console.log("belum ada didalam redis");
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
  //
};
