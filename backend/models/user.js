const mongoose = require('mongoose');

let User = new mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    phone_no: {
        type: Number
    },
    password: {
        type: String
    },
    type: {
        type: String
    }
});

module.exports = mongoose.model('User', User);