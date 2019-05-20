const mongoose = require('mongoose');

const cardPaymentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    cardHolder: {type: String, required: true},
    ccNumber: {type: String, required: true},
    cvcNumber: {type: Number, required: true},
    expDate: {type: String, required: true},
    amount: {type: String}
});

module.exports = mongoose.model('CardPayment', cardPaymentSchema);