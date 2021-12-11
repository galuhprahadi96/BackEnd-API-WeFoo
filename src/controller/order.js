const { postHistory, patchHistory, getHistoryById, getHistoryByInvoice } = require("../model/history");
const { postOrder, getOrderById, getHarga } = require("../model/order");

const helper = require("../helper/index.js");

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

module.exports = {
  postOrder: async (req, res) => {
    let orders = req.body.orders;
    let dataOrder;
    let subTotal = 0;

    dataInvoice = {
      user_id: req.body.user_id,
      invoice: randomInvoice(),
    };

    try {
      const invoiceResult = await postHistory(dataInvoice);
      const invoi = await getHistoryByInvoice(invoiceResult.invoice);

      for (let i = 0; i < orders.length; i++) {
        let resultPrice = await getHarga(orders[i].product_id);
        let { product_price } = resultPrice[0];
        let orderTotal = product_price * orders[i].qty;
        subTotal += orderTotal;
        dataOrder = {
          history_id: invoi.history_id,
          product_id: orders[i].product_id,
          order_qty: orders[i].qty,
          order_total: orderTotal,
        };

        await postOrder(dataOrder);
      }
      const setData = {
        subtotal: ppn(subTotal),
        history_created_at: new Date(),
      };


      let history = await patchHistory(setData, invoi.history_id);

      let product = await getOrderById(invoi.history_id);


      const result = {
        history_id: invoi.history_id,
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
