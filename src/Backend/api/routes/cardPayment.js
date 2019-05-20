const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const cPayment = require("../models/cardPayment");

//Added a dummy amount calculator
router.get('/price', (req,res,next) => {
    const response = {
        amount: 300,
        discount: 40,
        totalAmount: 260
    };

    return res.status(200).json(response);
});

router.post('/', (req, res, next) => {
    const cardPay = new cPayment({
        _id: new mongoose.Types.ObjectId(),
        cardHolder: req.body.cardHolder,
        ccNumber: req.body.ccNumber,
        cvcNumber: req.body.cvcNumber,
        expDate: req.body.expDate,
        amount: req.body.amount
    });

    cardPay.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Updated',
            createdCPayment: {
                cardHolder: result.cardHolder,
                ccNumber: result.ccNumber,
                cvcNumber: result.cvcNumber,
                expDate: result.expDate,
                amount: result.amount,
                _id: result._id,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3001/mobilePaymentInfo/'+ result._id
                }
            }
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;