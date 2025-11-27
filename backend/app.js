const mongoose = require('mongoose');
const express = require('express')
const productRoutes = require('./routes/product')
const categoryRoutes = require('./routes/category')
const reviewRoutes = require('./routes/review')
const userRoutes = require('./routes/user')
const cartRoutes = require('./routes/cartitem')
const orderRoutes = require('./routes/order')

//npm i body-parser
const bodyParser = require('body-parser')
const app = express()

//config view engine is ejs
app.set('view engine', 'ejs')
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true })); //midleware

//npm i cors
const cors = require('cors')
app.use(cors())

//connect db
mongoose.connect('mongodb://localhost:27017/CakeApp')
    .then(() => console.log('Connect successfuly!'))
    .catch(err => console.log('Error: ', err.message))

//use rout for product management
app.use('/products', productRoutes)
app.use('/categories', categoryRoutes)
app.use('/reviews', reviewRoutes)
app.use('/users', userRoutes)
app.use('/cart-items', cartRoutes)
app.use('/orders', orderRoutes)

const port = 3000
app.listen(port, () => {
    console.log(`Server is running at ${port} port`)
})