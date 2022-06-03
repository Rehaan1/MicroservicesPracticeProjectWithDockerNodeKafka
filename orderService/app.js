require('dotenv').config()

const express = require('express')
const cors = require('cors')
const redis = require('redis')
const addToCartRoute = require('./api/routes/addToCartRoute')
const getCartRoute = require('./api/routes/getCartRoute')
const placeOrderRoute = require('./api/routes/placeOrderRoute')
const mongoose = require('mongoose')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors())

mongoose.connect('mongodb://mongo:27017/project-db',
                {useNewUrlParser: true})
            .then(() => {
                console.log('MongoDB Connected')
            })
            .catch((err) => {
                console.log(err)
            })

const client = redis.createClient({
    url: 'redis://@redis:6379'
})

client.on('error', (err) => {
    console.log('Redis Client Error',err)
})

client.connect()
    .then(()=>{
        console.log("Redis Connected")
    })
    .catch((err) => {
        console.log(err)
    })

app.use('/addToCart',addToCartRoute)
app.use('/getCart',getCartRoute)
app.use('/placeOrder',placeOrderRoute)


app.get('/', (req,res) => {

    // client.set('hello','testing redis world')

    client.get('hello')
        .then((value) => {
            return res.status(200).json({
                status: 200,
                message:" API UP AND RUNNING",
                redisValue : value
            })
        })
        .catch((err) => {
            return res.status(200).json({
                status: 500,
                message:" Redis Fetching Error",
                error : err
            })
        })    
})

app.listen(process.env.PORT, () => {
    console.log('order Service Up and Running at port', process.env.PORT)
})