// import data model product
const {
  getSearchProduct,
  getProduct,
  getProductCount,
  getProductById,
  postProduct,
  putProduct,
  deleteProduct,
} = require("../model/product");

const qs = require("querystring");

const helper = require("../helper/index.js");
const fs = require("fs");

const redis = require("redis");
const client = redis.createClient();

const getPrevLink = (page, currentQuery) => {
  if (page > 1) {
    const generatedPage = {
      page: page - 1,
    };
    const resultPrevLink = { ...currentQuery, ...generatedPage };
    return qs.stringify(resultPrevLink);
  } else {
    return null;
  }
};

const getNextLink = (page, totalPage, currentQuery) => {
  if (page < totalPage) {
    const generatedPage = {
      page: page + 1,
    };
    const resultNextLink = { ...currentQuery, ...generatedPage };
    return qs.stringify(resultNextLink);
  } else {
    return null;
  }
};

module.exports = {
  getAllProduct: async (req, res) => {
    let { page, limit, name, sort } = req.query;
    let pageNumber = page === undefined ? 1 : page;
    let limitItem = limit === undefined ? 6 : limit;
    let nameSort = name === undefined ? "product_name" : name;
    let sortBy = sort === undefined ? "ASC" : sort;
    pageNumber = parseInt(pageNumber);
    limitItem = parseInt(limitItem);

    let totalData = await getProductCount();
    let totalPage = Math.ceil(totalData / limitItem);
    let offset = pageNumber * limitItem - limitItem;
    let prevLink = getPrevLink(pageNumber, req.query);
    let nextLink = getNextLink(pageNumber, totalPage, req.query);
    const pageInfo = {
      pageNumber,
      totalPage,
      limitItem,
      totalData,
      prevLink: prevLink && `http://127.0.0.1:3001/product?${prevLink}`,
      nextLink: nextLink && `http://127.0.0.1:3001/product?${nextLink}`,
    };
    try {
      const result = await getProduct(limitItem, offset, nameSort, sortBy);

      let newData = {
        result,
        pageInfo,
      };

      client.set(
        `getproduct:${JSON.stringify(req.query)}`,
        JSON.stringify(newData)
      );

      return helper.response(res, 200, `Success Get Product`, [
        result,
        pageInfo,
      ]);
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },

  getProductById: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await getProductById(id);
      if (result.length > 0) {
        client.setex(`getproductbyid:${id}`, 3600, JSON.stringify(result));
        return helper.response(res, 200, "Success Get Product By ID", result);
      } else {
        return helper.response(res, 404, `Product By Id : ${id} Not Found`);
      }
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },

  postProduct: async (req, res) => {
    try {
      const { id_category, product_name, product_price, status } = req.body;
      const setData = {
        id_category,
        product_name,
        product_image: req.file === undefined ? "" : req.file.filename,
        product_price,
        product_created_at: new Date(),
        status,
      };

      if (
        setData.id_category !== "" &&
        setData.product_name !== "" &&
        setData.product_image !== "" &&
        setData.product_price !== "" &&
        setData.status !== ""
      ) {
        const result = await postProduct(setData);
        return helper.response(res, 201, "Product Created", result);
      } else {
        return helper.response(res, 201, `values has insert`);
      }
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },

  putProduct: async (req, res) => {
    try {
      const id = req.params.id;
      const { id_category, product_name, product_price, status } = req.body;

      const setData = {
        id_category,
        product_name,
        product_image: req.file === undefined ? "" : req.file.filename,
        product_price,
        product_update_at: new Date(),
        status,
      };
      const checkId = await getProductById(id);
      if (checkId.length > 0) {
        if (
          setData.id_category !== "" &&
          setData.product_name !== "" &&
          setData.product_image !== "" &&
          setData.product_price !== "" &&
          setData.status !== ""
        ) {
          fs.unlink(`./uploads/${checkId[0].product_image}`, async (err) => {
            if (err) {
              throw err;
            } else {
              const result = await putProduct(setData, id);
              return helper.response(res, 201, "Product Updated", result);
            }
          });
        } else {
          return helper.response(res, 201, `values has insert`);
        }
      } else {
        return helper.response(res, 404, `Product By Id : ${id} Not Found`);
      }
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const id = req.params.id;
      const checkId = await getProductById(id);
      if (checkId.length > 0) {
        fs.unlink(`./uploads/${checkId[0].product_image}`, async (err) => {
          if (err) {
            throw err;
          } else {
            const result = await deleteProduct(id);
            return helper.response(res, 201, "Product Deleted", result);
          }
        });
      } else {
        return helper.response(res, 404, `Product by id : ${id} not found`);
      }
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },

  getSearchProduct: async (req, res) => {
    try {
      const { keyword } = req.query;

      const result = await getSearchProduct(keyword);
      let totalData = await getProductCount();
      const searchInfo = {
        Find: result.length,
        "Total Data": totalData,
      };

      if (result.length > 0) {
        return helper.response(res, 200, `Data found ${searchInfo.Find}`, [
          result,
          searchInfo,
        ]);
      } else {
        return helper.response(res, 404, `Product ${keyword} not found`);
      }
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },
};
