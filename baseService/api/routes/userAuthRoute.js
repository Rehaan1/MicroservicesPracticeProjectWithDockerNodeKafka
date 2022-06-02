const router = require('express').Router()
const axios = require('axios').default

router.post('/login', (req,res) => {
    
    axios.post('http://user-auth-service-app:3030/login', {
        email: req.body.email,
        password: req.body.password
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

router.post('/signup', (req,res) => {

    axios.post('http://user-auth-service-app:3030/signUp', {
        email: req.body.email,
        password: req.body.password
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