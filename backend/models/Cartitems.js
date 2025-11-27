const mongoose = require('mongoose');
const cartitemchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.String, ref: 'User', required: true },
    cakeId: { type: mongoose.Schema.Types.String, ref: 'Product', required: true },
    size: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    addedAt: { type: Date, default: Date.now }
}, { timestamps: true })
module.exports = mongoose.model('Cartitem', cartitemchema)
