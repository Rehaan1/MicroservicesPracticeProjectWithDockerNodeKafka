const router = require('express').Router()
const axios = require('axios').default

router.get('/login', (req,res) => {
    
    axios.get('http://user-auth-service-app:3030/login')
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

router.get('/signup', (req,res) => {

    axios.get('http://user-auth-service-app:3030/signUp')
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