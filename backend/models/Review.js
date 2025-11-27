const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.String, ref: 'User', required: true },
    cakeId: { type: mongoose.Schema.Types.String, ref: 'Product', required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
}, { timestamps: true })
module.exports = mongoose.model('Review', reviewSchema)
