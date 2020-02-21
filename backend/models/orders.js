const mongoose = require('mongoose');

let Orders = new mongoose.Schema({
    product_name: {
        type: String,
        required: true
    },
    customer_name: {
        type: String,
        required: true
    },
    vendor_name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Orders', Orders);