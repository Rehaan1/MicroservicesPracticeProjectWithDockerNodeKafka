const router = require('express').Router()
const axios = require('axios').default

router.get('/login', (req,res) => {
    
    axios.get('http://localhost:3030/login')
        .then((response) => {
            console.log(response)
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

    axios.get('http://localhost:3030/signUp')
        .then((response) => {
            console.log(response)
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