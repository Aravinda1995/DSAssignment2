const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const mPayment = require("../models/mobilePayment");

//Added a dummy get request to get the ticket price
router.get('/price', (req,res,next) => {
    const response = {
        amount: 300,
        discount: 40,
        totalAmount: 260
    };

    return res.status(200).json(response);
});

router.post('/', (req, res, next) => {
    const mobilePay = new mPayment({
        _id: new mongoose.Types.ObjectId(),
        mobileNo: req.body.mobileNo,
        pinNo: req.body.pinNo,
        amount: req.body.amount
    });

    mobilePay.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Updated',
            createdMPayment: {
                mobileNo: result.mobileNo,
                pinNo: result.pinNo,
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