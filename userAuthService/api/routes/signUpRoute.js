const router = require('express').Router()
const User = require('../../models/userModel')
const bcrypt = require('bcryptjs')

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

    User.findOne({email:req.body.email})
        .then((user) => {
            if(user)
            {
                return res.status(200).json({
                    status:200,
                    message: 'Email Already Exists'
                })
            }
            
            bcrypt.genSalt(10)
                .then((salt) => {
                    bcrypt.hash(req.body.password,salt)
                        .then((hashedPassword) => {
                            const user = new User({
                                email: req.body.email,
                                password: hashedPassword
                            })

                            user.save()
                                .then((user) =>{
                                    if(user)
                                    {
                                        return res.status(200).json({
                                            status:200,
                                            message: 'User Created'
                                        })
                                    }
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