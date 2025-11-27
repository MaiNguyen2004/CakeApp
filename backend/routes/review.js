const express = require('express')
const router = express.Router()
const Review = require('../models/Review')
const mongoose = require('mongoose');
// getReview by CakeId
router.get('/get-reviews/:productId', async (req, res) => {
    try {
        const reviews = await Review.find({ cakeId: req.params.productId })
        res.json(reviews)
    } catch (err) {
        console.log("Error:", err.message);
        res.status(500).json({ error: err.message })
    }
})


module.exports = router