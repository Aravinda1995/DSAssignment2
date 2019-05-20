const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    toStation: {type: String, required: true},
    fromStation: {type: String, required: true},
    noOfTickets: {type: Number, required: true},
    noOfAdults: {type: Number, required: true},
    noOfChildren: {type: Number, required: true},
    nic: {type: String, required: true},
    date: {type: String, required: true}
});

module.exports = mongoose.model('TicketDetails', ticketSchema);