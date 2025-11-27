const express = require('express')
const User = require('../models/User')
const router = express.Router()
// getUserName

router.get('/allUser', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).send({ Error: err.messages })
    }
})
module.exports = router