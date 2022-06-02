const router = require('express').Router()

router.get('/', (req,res) => {
    return res.status(200).json({
        status: 200,
        message: "order service addToCart endpoint"
    })
})

module.exports = router