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
        console.log("Redis Connected in Add To Cart")
    })
    .catch((err) => {
        console.log(err)
    })

router.post('/', verify, (req,res) => {

    if(!req.body.item)
    {
        return res.status(200).json({
            status: 400,
            erroMessage: 'missing required parameters. refer documentation'
          })
    }
    if(!req.body.quantity)
    {
        return res.status(200).json({
            status: 400,
            erroMessage: 'missing required parameters. refer documentation'
          })
    }

    if(req.body.quantity <= 0)
    {
        client.hDel('cart:'+req.user._id, req.body.item)
            .then(()=>{
                return res.status(200).json({
                    status: 200,
                    message: "Removed from Cart",
                    item: req.body.item
                })
            })
            .catch((err) => {
                return res.status(200).json({
                    status: 500,
                    message:" Redis HDEL Error",
                    error : err
                })
            })    
    }
    else
    {
        client.hSet('cart:'+req.user._id, req.body.item, req.body.quantity)
            .then(()=>{
               
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
            .catch((err) => {
                return res.status(200).json({
                    status: 500,
                    message:" Redis HSET Error",
                    error : err
                })
            })    
    }
    
})

module.exports = router