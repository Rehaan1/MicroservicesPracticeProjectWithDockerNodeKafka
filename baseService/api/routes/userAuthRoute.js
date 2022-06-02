const router = require('express').Router()

router.get('/login', (req,res) => {
    return res.status(200).json({
        status: 200,
        message: "login endpoint"
    })
})

router.get('/signup', (req,res) => {
    return res.status(200).json({
        status: 200,
        message: "signup endpoint"
    })
})

module.exports = router