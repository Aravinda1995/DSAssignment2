const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
    fName: {type: String, required: true},
    lName: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    nic: {type: String, required: true},
    email: {
     type: String,
     required: true
   }
});

module.exports = mongoose.model('User', userSchema);