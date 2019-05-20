const mongoose = require('mongoose');

const userSessionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    timestamp: {type: Date, default: -1},
    isDeleted: {type: Boolean, default: false}
});

module.exports = mongoose.model('UserSession', userSessionSchema);