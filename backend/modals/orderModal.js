const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema ({
    customerDetails: {

    },
    orderStatus: {
        type: String,
        required: true
    },
    orderDate: {
        type:Date,
        default : Date.now()
    },
    bills: {
        total: {type: Number, required:true},
        tax: {type: Number, required:true},
        totalWithTax: {type: Number, required:true},
    },
    items: [],
    table: {type: mongoose.Schema.Types.ObjectId, ref: "Table"} 
}, {timestamps : true})

module.exports = mongoose.model("Order",orderSchema);