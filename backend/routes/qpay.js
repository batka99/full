const express = require('express')
const {getQpay, getInvoice, checkPayment, getQpayRefreshToken} = require('../controller/qpay/qpayController')


const qpayRouter = express.Router()


qpayRouter.route('/').post(getQpay);
qpayRouter.route('/invoice').post(getInvoice);
qpayRouter.route('/checkPayment').post(checkPayment);
qpayRouter.route('/refreshToken').post(getQpayRefreshToken);


module.exports = qpayRouter;