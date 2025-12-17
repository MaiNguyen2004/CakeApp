const express = require('express')
const router = express.Router()
const Cartitem = require('../models/Cartitems')

router.get('/get-cart', async (req, res) => {
    try {
        const carts = await Cartitem.find()
        return res.json(carts)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
router.post('/add-cart', async (req, res) => {
    try {
        console.log("data cartitem trong backend: ", req.body)
        const { userId, cakeId, quantity, price, addedAt } = req.body
        const newCart = new Cartitem({ userId, cakeId, quantity, price, addedAt })
        await newCart.save()
        return res.json({
            message: "Thêm vào giỏ hàng thành công!",
            cart: newCart
        });

    } catch (error) {
        res.status(500).send(error)
    }
})
module.exports = router