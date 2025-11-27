const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.String, ref: 'User', required: true },
    items: { type: Array, required: true },
    totalAmount: { type: Number, required: true },
    status: { type: String, required: true },
    address: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true })
module.exports = mongoose.model('Order', orderSchema)
