const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    flavor: { type: String },
    stock: { type: Number },
    images: { type: String, required: true },
    categoryId: { type: String, required: true },
    productCreatorId: { type: mongoose.Schema.Types.String, ref: 'User', required: true }
})
module.exports = mongoose.model('Product', productSchema)