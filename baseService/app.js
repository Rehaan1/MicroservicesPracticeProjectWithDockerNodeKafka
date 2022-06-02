require('dotenv').config()

const express = require('express')
const cors = require('cors')
const userAuthRoute = require('./api/routes/userAuthRoute')
const orderRoute = require('./api/routes/orderRoute')


const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors())

app.use('/user',userAuthRoute)
app.use('/order',orderRoute)


app.get('/', (req,res) => {
    return res.status(200).json({
        message:" API UP AND RUNNING"
    })
})

app.listen(process.env.PORT, () => {
    console.log('Base Service Up and Running at port', process.env.PORT)
})