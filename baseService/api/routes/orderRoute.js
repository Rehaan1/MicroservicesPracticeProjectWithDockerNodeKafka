const router = require('express').Router()
const axios = require('axios').default

router.post('/addToCart', (req,res) => {

    axios.post('http://order-service-app:4040/addToCart', {
        item: req.body.item,
        quantity: req.body.quantity
        }, {
            headers: {
                'auth-token': req.header('auth-token')
            }
        })
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
    
    axios.get('http://order-service-app:4040/getCart',{
        headers: {
            'auth-token': req.header('auth-token')
        }
    })
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
    
    axios.get('http://order-service-app:4040/placeOrder', {
        headers: {
            'auth-token': req.header('auth-token')
        }
    })
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