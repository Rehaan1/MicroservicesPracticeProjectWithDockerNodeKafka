const router = require('express').Router()

router.get('/', (req,res) => {
    return res.status(200).json({
        status: 200,
        message: "userAuth service signUp endpoint"
    })
})

module.exports = router