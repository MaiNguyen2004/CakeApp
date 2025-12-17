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
        const { name, price, description, flavor, stock, images, categoryId, productCreatorId } = req.body //get data from user
        console.log("data product: ", req.body)
        const newProduct = new Product({ name, price, description, flavor, stock, images, categoryId, productCreatorId }) // create a new product
        await newProduct.save()// save to document of mongo
        return res.status(200).json({
            message: "Thêm sản phẩm thành công", newProduct
        })
    } catch (error) {
        console.log("Backend Error: ", error);
        res.status(500).send(error)
    }
})

router.get('/get-product-by-creatorId/:creatorId', async (req, res) => {
    try {
        const { creatorId } = req.params
        // console.log("creator: ", creatorId)
        if (!creatorId) {
            res.status(400).json({ message: 'Người dùng chưa đăng nhập' })
        }
        const product = await Product.find({ productCreatorId: creatorId })
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/get-product-by-createId-cateId/:creatorId/:cateId', async (req, res) => {
    try {
        const { creatorId, cateId } = req.params
        if (!creatorId) {
            res.status(400).json({ message: 'Người dùng chưa đăng nhập' })
        }
        const product = await Product.findOne({ productCreatorId: creatorId, _id: cateId })
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.get('/get-product-by-cateId/:id', async (req, res) => {
    try {
        // console.log("id product: ", req.params.id)
        const product = await Product.findById(req.params.id)
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//update product
router.put('/edit-product/:id', async (req, res) => {
    try {
        // console.log("data product upadte: ", req.body)
        const { name, price, description, flavor, stock, images, categoryId, productCreatorId } = req.body
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { name, price, description, flavor, stock, images, categoryId, productCreatorId }, { new: true })
        return res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).send(error)
    }
})

//delete product
router.post('/delete-product/:id', async (req, res) => {
    try {
        const deleteProduct = await Product.findByIdAndDelete(req.params.id)
        if (!deleteProduct) {
            res.status(400).json({ message: "Product not found." })
        }
        res.status(200).json({ message: "Delete product successfully." })

    } catch (error) {
        res.status(500).send(error)
    }
})


module.exports = router