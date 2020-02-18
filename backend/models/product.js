const mongoose = require('mongoose');

let Product = new mongoose.Schema({
    vendor_name: {
        type: String,
        required: true
    },
    p_name: {
        type: String,
        required: true
    },
    total_quantity: {
        type: Number,
        required: true
    },
    avail_quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Product', Product);