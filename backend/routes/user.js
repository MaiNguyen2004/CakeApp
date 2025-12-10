const express = require('express')
const User = require('../models/User')
const router = express.Router()
const bcrypt = require('bcrypt')
// getUserName

router.get('/allUser', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).send({ Error: err.messages })
    }
})
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role, gender, avatar, dateOfBirth, address, phone } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ name, email, password: hashedPassword, role, gender, avatar, dateOfBirth, address, phone })
        await newUser.save()
        return res.status(201).json({
            messages: "Register success",
            user: newUser
        })
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        console.log("email: ", email)
        console.log("pass: ", password)
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and Password is required."
            })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: "Email not exist."
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                message: "Password incorrect."
            })
        }
        return res.status(200).json({
            message: "Login success", user
        })
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})
router.put('/profile/:email', async (req, res) => {
    try {
        const { email } = req.params
        const data = req.body
        console.log("email: ", email)
        console.log("data: ", data)

        const update = await User.findOneAndUpdate({ email }, data, { new: true })
        if (!update) return res.status(404).json({ message: "profile not found" });
        res.json(update)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
module.exports = router