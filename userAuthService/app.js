require('dotenv').config()

const express = require('express')
const cors = require('cors')
const loginRoute = require('./api/routes/loginRoute')
const signUpRoute = require('./api/routes/signUpRoute')


const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors())

app.use('/login',loginRoute)
app.use('/signUp',signUpRoute)


app.get('/', (req,res) => {
    return res.status(200).json({
        message:" API UP AND RUNNING"
    })
})

app.listen(process.env.PORT, () => {
    console.log('userAuth Service Up and Running at port', process.env.PORT)
})