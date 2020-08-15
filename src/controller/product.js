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
// import helper
const helper = require("../helper/index.js");
const { request } = require("express");

// logic prevlink pagination
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
// end logic pagination

module.exports = {
  // method ambil data product
  getAllProduct: async (req, res) => {
    let { page = 0, limit = 2 } = req.query;
    console.log(page);
    page = parseInt(page);
    limit = parseInt(limit);
    let totalData = await getProductCount();
    let totalPage = Math.ceil(totalData / limit);
    let offset = page * limit - limit;
    let prevLink = getPrevLink(page, req.query);
    let nextLink = getNextLink(page, totalPage, req.query);
    const pageInfo = {
      page, // page: page
      totalPage,
      limit,
      totalData,
      prevLink: prevLink && `http://127.0.0.1:3001/product?${prevLink}`,
      nextLink: nextLink && `http://127.0.0.1:3001/product?${nextLink}`,
    };
    try {
      const result = await getProduct(limit, offset);
      return helper.response(res, 200, "Success Get Product", [
        result,
        pageInfo,
      ]);
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },

  // method ambil data per id
  getProductById: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await getProductById(id);
      if (result.length > 0) {
        return helper.response(res, 200, "Success Get Product By ID", result);
      } else {
        return helper.response(res, 404, `Product By Id : ${id} Not Found`);
      }
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },

  // method input data
  postProduct: async (req, res) => {
    try {
      const {
        id_category,
        product_name,
        product_image,
        product_price,
        status,
      } = req.body;
      const setData = {
        id_category,
        product_name,
        product_image,
        product_price,
        product_created_at: new Date(),
        status,
      };
      const result = await postProduct(setData);
      return helper.response(res, 201, "Product Created", result);
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },

  // method update data

  putProduct: async (req, res) => {
    try {
      const id = req.params.id;
      const {
        id_category,
        product_name,
        product_image,
        product_price,
        status,
      } = req.body;
      const setData = {
        id_category,
        product_name,
        product_image,
        product_price,
        product_update_at: new Date(),
        status,
      };
      const checkId = await getProductById(id);
      if (checkId.length > 0) {
        const result = await putProduct(setData, id);
        return helper.response(res, 201, "Product Updated", result);
      } else {
        return helper.response(res, 404, `Product By Id : ${id} Not Found`);
      }
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },

  // method delete product
  deleteProduct: async (req, res) => {
    try {
      const id = req.params.id;
      const checkId = await getProductById(id);
      if (checkId.length > 0) {
        const result = await deleteProduct(id);
        return helper.response(res, 201, "Product Deleted", result);
      } else {
        return helper.response(res, 404, `Product by id : ${id} not found`);
      }
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },

  // method search name
  getSearchProduct: async (req, res) => {
    try {
      const { keyword } = req.query;

      const result = await getSearchProduct(keyword);
      let totalData = await getProductCount();
      const searchInfo = {
        Find: result.length,
        From: totalData,
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
