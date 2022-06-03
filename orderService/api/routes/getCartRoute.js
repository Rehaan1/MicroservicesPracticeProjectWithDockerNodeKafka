const router = require('express').Router()
const redis = require('redis')
const verify = require('../middleware/verifyToken')

const client = redis.createClient({
    url: 'redis://@redis:6379'
})

client.on('error', (err) => {
    console.log('Redis Client Error',err)
})

client.connect()
    .then(()=>{
        console.log("Redis Connected in Get Cart")
    })
    .catch((err) => {
        console.log(err)
    })


router.get('/', verify, (req,res) => {

    client.hGetAll('cart:'+req.user._id)
    .then((value)=>{
        return res.status(200).json({
            status: 200,
            message: "Added To Cart",
            item: req.body.item,
            quantity: req.body.quantity,
            cart: value
        })
    })
    .catch((err) => {
        return res.status(200).json({
            status: 500,
            message:" Redis HGETALL Error",
            error : err
        })
    })

})

module.exports = router