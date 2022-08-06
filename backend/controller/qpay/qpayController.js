const asyncHandler = require("express-async-handler");
const axios = require('axios');
const { response, json } = require('express');
const request = require('request');
const { parse } = require("dotenv");



exports.getQpay = asyncHandler(async (req, res, next)=>{

    try{
      var options = {
			'method': 'POST',
			'url': 'https://merchant.qpay.mn/v2/auth/token',
			'headers': {
						'Authorization': 'Basic'
			},
            "auth": {
                "username": "VOLT_SYSTEM",
                "password": "7VAsM58u",
            }}; 
    request(options, function (error, response) {
        res.send(response.body);
    })

}catch(error){
        res.status(400).json({
            success: false,
            error: error,
        })
    }
})

exports.getQpayRefreshToken = asyncHandler(async (req, res, next)=>{
    const tokenData = req.body

    try{
      var options = {
			'method': 'POST',
			'url': 'https://merchant.qpay.mn/v2/auth/refresh',
			'headers': {
                'Content-Type': 'application/json',
				'Authorization': `Bearer ${tokenData.body.tokenRefresh}`
			},

        
        }; 
    request(options, function (error, response) {
        res.send(response.body);
    })

}catch(error){
        res.status(400).json({
            success: false,
            error: error,
        })
    }
})


exports.getInvoice = asyncHandler(async (req, res, next)=>{
    const paymentData = req.body
    
    try{

        ////

        var options = {
			'method': 'POST',
			'url': 'https://merchant.qpay.mn/v2/invoice',
			'headers': {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${paymentData.body.token}`
			},
			body: JSON.stringify(
                {
                    "invoice_code": "VOLT_SYSTEM_INVOICE",
                    "sender_invoice_no": "123455678",
                    "invoice_receiver_code": "83",
                    "sender_branch_code":"BRANCH1",
                    "invoice_description": "Order No1311 200.00",
                    "enable_expiry":"false",
                    "allow_partial": false,
                    "minimum_amount": null,
                    "allow_exceed": false,
                    "maximum_amount": null,
                    "amount": 200,
                    "callback_url": "https://bd5492c3ee85.ngrok.io/payments?payment_id=12345678",
                    "sender_staff_code": "online",
                    "note":null,
                    "invoice_receiver_data": {
                        "register": "UZ96021105",
                        "name": "Ganzul",
                        "email": "test@gmail.com",
                        "phone": "88614450"
                    },
                    "lines": [
                        {
                            "tax_product_code": "6401",
                            "line_description": " Order No1311 200.00 .",
                            "line_quantity": "1.00",
                            "line_unit_price": paymentData.body.price,
                            "note": "-.",
                            "discounts": [
                                {
                                    "discount_code": "NONE",
                                    "description": " discounts",
                                    "amount": 10,
                                    "note": " discounts"
                                }
                            ],
                            "surcharges": [
                                {
                                    "surcharge_code": "NONE",
                                    "description": "Хүргэлтийн зардал",
                                    "amount": 10,
                                    "note": " Хүргэлт"
                                }
                            ],
                            "taxes": [
                                {
                                    "tax_code": "VAT",
                                    "description": "НӨАТ",
                                    "amount": 0,
                                    "note": " НӨАТ"
                                }
                            ]
                        }
                    ]
                }
			   
			)

            };
            request(options, function (error, response) {
                        if (error) throw new Error(error);
                        res.send(response.body);
            });



        ///////

        

}catch(error){
        res.status(400).json({
            success: false,
            error: error,
        })
    }
})



exports.checkPayment = asyncHandler(async (req, res, next)=>{
    const checkPaymentData = req.body

    try{

        var options = {
			'method': 'POST',
			'url': 'https://merchant.qpay.mn/v2/payment/check',
			'headers': {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${checkPaymentData.body.token}`
			},
			body: JSON.stringify({
			   "object_type": "INVOICE",
			   "object_id": checkPaymentData.body.invoiceId,
                // "object_id": '9a5c90cb-f296-49b2-a968-faf9e8ca8eee',
                // "object_id": 'a1bdce5a-05b5-4d8b-93d2-14981466a482',
                "callback_url": `https://qpay.mn/payment/result?payment_id=${checkPaymentData.body.invoiceId}`,

			   "offset": {
			      "page_number": 1,
			      "page_limit": 100
			   }
			})

};
request(options, function (error, response) {
    res.send(response.body);
});





    }catch(error){

    }




})