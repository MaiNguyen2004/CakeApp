const express = require('express')
const router = express.Router()
const Category = require('../models/Categories')

router.get('/categoryList', async (req, res) => {
    try {
        const categories = await Category.find()
        return res.json(categories)
    } catch (error) {
        res.status(500).send(error.message)
    }
})
module.exports = router