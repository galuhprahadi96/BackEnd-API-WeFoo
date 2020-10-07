const {
  getSearchProduct,
  getProduct,
  getProductActive,
  getProductCount,
  getProductById,
  postProduct,
  putProduct,
  deleteProduct,
} = require("../model/product");

const qs = require("querystring");
const helper = require("../helper/index.js");
const fs = require("fs");

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

      if (product_name === "") {
        return helper.response(res, 400, "input product name first", error);
      } else if (product_price === "") {
        return helper.response(res, 400, "input profuct price first", error);
      } else if (id_category === "") {
        return helper.response(res, 400, "Please select category", error);
      } else {
        if (req.file === undefined || req.file === "") {
          const setData = {
            id_category,
            product_name,
            product_image: "default.png",
            product_price,
            product_created_at: new Date(),
            status,
          };
          const result = await postProduct(setData);
          return helper.response(res, 201, "Product Created", result);
        } else {
          const setData = {
            id_category,
            product_name,
            product_image: req.file === undefined ? "" : req.file.filename,
            product_price,
            product_created_at: new Date(),
            status,
          };
          const result = await postProduct(setData);
          return helper.response(res, 201, "Product Created", result);
        }
      }
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },

  putProduct: async (req, res) => {
    try {
      const id = req.params.id;
      const { id_category, product_name, product_price, status } = req.body;

      const checkId = await getProductById(id);
      if (checkId.length > 0) {
        if (
          id_category !== "" &&
          product_name !== "" &&
          product_price !== "" &&
          status !== ""
        ) {
          if (req.file === undefined || req.file === "") {
            const Data = {
              id_category,
              product_name,
              product_price,
              product_update_at: new Date(),
              status,
            };
            const result = await putProduct(Data, id);
            return helper.response(res, 201, "Product Updated", result);
          } else {
            const setData = {
              id_category,
              product_name,
              product_image: req.file.filename,
              product_price,
              product_update_at: new Date(),
              status,
            };
            if (checkId[0].product_image === "default.png") {
              const result = await putProduct(setData, id);
              return helper.response(res, 201, "Product Updated", result);
            } else {
              fs.unlink(
                `./uploads/${checkId[0].product_image}`,
                async (err) => {
                  if (err) {
                    throw err;
                  } else {
                    const result = await putProduct(setData, id);
                    return helper.response(res, 201, "Product Updated", result);
                  }
                }
              );
            }
          }
        } else {
          return helper.response(res, 400, `values has insert`);
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
        if (checkId[0].product_image === "default.png") {
          const result = await deleteProduct(id);
          return helper.response(res, 201, "Product Deleted", result);
        } else {
          fs.unlink(`./uploads/${checkId[0].product_image}`, async (err) => {
            if (err) {
              throw err;
            } else {
              const result = await deleteProduct(id);
              return helper.response(res, 201, "Product Deleted", result);
            }
          });
        }
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
      if (result.length > 0) {
        return helper.response(res, 200, `Data found`, result);
      } else {
        return helper.response(res, 400, `Product ${keyword} not found`);
      }
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },
};
