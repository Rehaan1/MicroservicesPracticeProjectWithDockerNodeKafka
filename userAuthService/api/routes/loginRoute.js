const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../models/userModel')

router.post('/', (req,res) => {

    if(!req.body.email)
    {
        return res.status(200).json({
            erroMessage: 'missing required parameters. refer documentation'
          })
    }

    if(!req.body.password)
    {
        return res.status(200).json({
            erroMessage: 'missing required parameters. refer documentation'
          })
    }


   User.findOne({email: req.body.email})
    .then((user) => {
        if(!user)
        {
            return res.status(200).json({
                status: 200,
                message: "email or password does not match"
            })
        }

        bcrypt.compare(req.body.password, user.password)
            .then((validPass) => {
                if(!validPass)
                {
                    return res.status(200).json({
                        status: 200,
                        message: "email or password does not match"
                    })
                }

                const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET)
                return res.status(200).json({
                    status: 200,
                    message: "Login Successful",
                    token: token
                })
            })
            .catch((err) => {
                return res.status(500).json({
                    status:500,
                    err: err
                })
            })
    })
    .catch((err) => {
        return res.status(500).json({
            status:500,
            err: err
        })
    })
})

module.exports = router