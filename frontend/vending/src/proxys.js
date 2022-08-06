
const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy("/v2/invoice", {
      target: "https://merchant.qpay.mn",
      secure: false,
      changeOrigin: true
    })
  );
};