require('dotenv').config()

const express = require('express')
const cors = require('cors')
const addToCartRoute = require('./api/routes/addToCartRoute')
const getCartRoute = require('./api/routes/getCartRoute')
const placeOrderRoute = require('./api/routes/placeOrderRoute')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors())

app.use('/addToCart',addToCartRoute)
app.use('/getCart',getCartRoute)
app.use('/placeOrder',placeOrderRoute)


app.get('/', (req,res) => {
    return res.status(200).json({
        message:" API UP AND RUNNING"
    })
})

app.listen(process.env.PORT, () => {
    console.log('order Service Up and Running at port', process.env.PORT)
})