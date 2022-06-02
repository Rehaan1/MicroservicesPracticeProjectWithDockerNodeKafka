const router = require('express').Router()

router.get('/addToCart', (req,res) => {
    return res.status(200).json({
        status: 200,
        message: "addToCart endpoint"
    })
})

router.get('/getCart', (req,res) => {
    return res.status(200).json({
        status: 200,
        message: "getCart endpoint"
    })
})

router.get('/placeOrder', (req,res) => {
    return res.status(200).json({
        status: 200,
        message: "placeOrder endpoint"
    })
})

module.exports = router