const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
    tableNo: {type: Number, required: true, unique: true},
    status: {type: String, enum: ["Available", "Booked", "Occupied"], default: "Available"},
    customerInfo: {
        name: {type: String},
        phone: {type: Number},
        guests: {type: Number},
    },
    seats:{
        type:Number,
        required: true
    },
    order: {type: mongoose.Schema.Types.ObjectId, ref: "Order"}
})

const Table = mongoose.model("Table", tableSchema);
module.exports = Table;