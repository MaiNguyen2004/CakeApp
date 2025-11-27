const express = require('express')
const router = express.Router()
const Product = require('../models/Products')

//display list of product
router.get('/admin', async (req, res) => {
    try {
        const products = await Product.find()// get all product
        // res.render('admin', { products })
        res.json(products)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// add product
router.post('/add-product', async (req, res) => {
    try {
        const { id, name, price, discription, size, flavor, stock, images, category } = req.body //get data from user
        const newProduct = new Product({ id, name, price, discription, size, flavor, stock, images, category }) // create a new product
        await newProduct.save()// save to document of mongo
        res.redirect('/admin')
    } catch (error) {
        res.status(500).send(error)
    }
})
router.get('/get-product/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//get info of a exist product
router.get('/edit-product/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        const products = await Product.find()
        res.render('admin', { product, products })//send all product to the response
    } catch (error) {
        res.status(500).send(error)
    }
})

//update product
router.post('/edit-product/:id', async (req, res) => {
    try {
        const { name, price, discription, size, flavor, stock, images, category } = req.body
        await Product.findByIdAndUpdate(req.params.id, { name, price, discription, size, flavor, stock, images, category })
        res.redirect('/admin')
    } catch (error) {
        res.status(500).send(error)
    }
})

//delete product
router.post('/delete-product/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.redirect('/admin')
    } catch (error) {
        res.status(500).send(error)
    }
})


module.exports = router