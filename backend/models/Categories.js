const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: String, required: true },
})
module.exports = mongoose.model('Category', categorySchema)