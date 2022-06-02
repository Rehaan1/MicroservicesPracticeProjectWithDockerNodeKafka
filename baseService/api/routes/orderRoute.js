const router = require('express').Router()
const axios = require('axios').default

router.get('/addToCart', (req,res) => {

    axios.get('http://order-service-app:4040/addToCart')
        .then((response) => {
            
            return res.status(200).json({
                status: 200,
                message: response.data
            })
        })
        .catch((err) => {
            return res.status(500).json({
                status: 500,
                message: err
            })
        })
    
})

router.get('/getCart', (req,res) => {
    
    axios.get('http://order-service-app:4040/getCart')
        .then((response) => {
            
            return res.status(200).json({
                status: 200,
                message: response.data
            })
        })
        .catch((err) => {
            return res.status(500).json({
                status: 500,
                message: err
            })
        })

})

router.get('/placeOrder', (req,res) => {
    
    axios.get('http://order-service-app:4040/placeOrder')
    .then((response) => {
        
        return res.status(200).json({
            status: 200,
            message: response.data
        })
    })
    .catch((err) => {
        return res.status(500).json({
            status: 500,
            message: err
        })
    })

})

module.exports = router