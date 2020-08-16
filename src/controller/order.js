// export models
const { postHistory, patchHistory } = require("../model/history");
const { postOrder, getOrderById, getHarga } = require("../model/order");

// import helper
const helper = require("../helper/index.js");
const { request, query } = require("express");
const { response } = require("../helper/index.js");

// cetak invoice
const randomInvoice = () => {
  let random = "";
  for (let i = 1; i <= 6; i++) {
    random += Math.floor(Math.random() * 9);
  }
  let invoice = parseInt(random);
  return invoice;
};

const ppn = (total) => {
  let ppn = (total * 10) / 100;
  return ppn + total;
};

// method
module.exports = {
  postOrder: async (req, res) => {
    // ambil ata request
    let orders = req.body.orders;
    let dataOrder;
    let subTotal = 0;

    // ambil data random invoice
    dataInvoice = {
      invoice: randomInvoice(),
    };

    try {
      //input invoice
      const invoiceResult = await postHistory(dataInvoice);

      // ambil data dan simpan ke dalam post order
      for (let i = 0; i < orders.length; i++) {
        // ambil harga product
        let resultPrice = await getHarga(orders[i].product_id);
        let { product_price } = resultPrice[0];
        let orderTotal = product_price * orders[i].qty;

        // jumlahkan subtotal
        subTotal += orderTotal;
        dataOrder = {
          history_id: invoiceResult.history_id,
          product_id: orders[i].product_id,
          order_qty: orders[i].qty,
          order_total: orderTotal,
        };

        // simpan data order
        let order = await postOrder(dataOrder);
      }

      // update data history
      const setData = {
        subtotal: ppn(subTotal),
        history_created_at: new Date(),
      };

      // update history
      let history = await patchHistory(setData, dataOrder.history_id);

      // ambil data order
      let product = await getOrderById(invoiceResult.history_id);

      const result = {
        history_id: history.history_id,
        invoice: invoiceResult.invoice,
        subtotal: setData.subtotal,
        created_at: setData.history_created_at,
        orders: product,
      };
      return helper.response(res, 200, "Order success", result);
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },
};
