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
        if (!userId) {
            return res.status(401).json({ message: "Người dùng chưa đăng nhập." })
        }
        const purchase = await Order.find({ userId: userId })
        if (purchase.length === 0) {
            return res.status(404).json({ message: "Không có đơn hàng nào." })
        }
        const result = purchase.map(order => ({
            orderId: order._id,
            userId: order.userId,
            items: order.items,
            totalAmount: order.totalAmount,
            status: order.status,
            address: order.address,
        }))
        console.log(JSON.stringify(result, null, 2))
        res.status(200).json(result)
    } catch (err) {
        res.status(500).send(err)
    }
})
module.exports = router