const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Object, required: true },
    description: { type: String, required: true },
    size: { type: Array, required: true },
    flavor: { type: String, required: true },
    stock: { type: Number, required: true },
    images: { type: String, required: true },
    category: { type: String, required: true },
})
module.exports = mongoose.model('Product', productSchema)