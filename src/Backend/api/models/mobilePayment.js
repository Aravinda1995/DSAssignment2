const mongoose = require('mongoose');

const mobilePaymentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    mobileNo: {type: Number, required: true},
    pinNo: {type: Number, required: true},
    amount: {type: String}
});

module.exports = mongoose.model('MobilePayment', mobilePaymentSchema);