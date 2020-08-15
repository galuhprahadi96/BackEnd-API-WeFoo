// export models
const { postHistory } = require("../model/history");
const { getHarga, postOrder } = require("../model/order");

// import helper
const helper = require("../helper/index.js");
const { request } = require("express");
const product = require("../model/product");

// cetak invoice
const randomInvoice = () => {
  let random = "";
  for (let i = 1; i <= 6; i++) {
    random += Math.floor(Math.random() * 9);
  }
  let invoice = parseInt(random);
  return invoice;
};

// method
module.exports = {
  postOrder: async (req, res) => {
    try {
      // ambil data postman
      const orders = req.body.orders;

      // // simpan data invoice
      // dataInvoice = {
      //   invoice: randomInvoice(),
      // };
      // const invoiceResult = await postHistory(dataInvoice);

      // post order
      let getHargaProduct = async (id) => {
        return (harga = await getHarga(id));
      };
      // post order
      const order = async (dataOrder) => {
        return (order = await postOrder(dataOrder));
      };

      // looping order
      orders.map((i) => {
        id = i.product_id;
        // data order
        dataOrder = {
          product_id: id,
          history_id: 1,
          order_qty: i.qty,
        };
        console.log(getHargaProduct(id));
      });

      // simpan data order
    } catch (error) {}
  },
};
