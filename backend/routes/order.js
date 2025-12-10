const express = require('express')
const router = express.Router()
const Order = require('../models/Orders')

router.post('/add-order', async (req, res) => {
    try {
        const { userId, items, totalAmount, status, address, createdAt } = req.body //get data from user
        const newOrder = new Order({ userId, items, totalAmount, status, address, createdAt }) // create a new product
        await newOrder.save()
        return res.json({
            message: "Thanh toan thành công!",
            cart: newOrder
        });
    } catch (error) {
        res.status(500).send(error)
    }
})
router.get('/purchase-order/:userId', async (req, res) => {
    try {
        const { userId } = req.params
        const purchase = await Order.find({ userId })
        res.json(purchase)
    } catch (err) {
        res.status(500).send(err)
    }
})
module.exports = router