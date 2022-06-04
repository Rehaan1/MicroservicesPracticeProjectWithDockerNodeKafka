require('dotenv').config()

const express = require('express')
const cors = require('cors')
const kafka = require('kafka-node');
const userAuthRoute = require('./api/routes/userAuthRoute')
const orderRoute = require('./api/routes/orderRoute')


const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors())

console.log('Connecting to New Kafka....')

const client = new kafka.KafkaClient({
    kafkaHost:
      process.env.ENVIRONMENT === 'local'
        ? process.env.INTERNAL_KAFKA_ADDR
        : process.env.EXTERNAL_KAFKA_ADDR,
  });

const Producer = kafka.Producer;
const producer = new Producer(client);

producer.on('ready', () => {
    console.log("KAFKA PRODUCER READY..........")
})

producer.on('error', (err) => {
    console.log('KAFKA ERROR', err)
})

app.use('/user',userAuthRoute)
app.use('/order',orderRoute)


app.get('/', (req,res) => {
    return res.status(200).json({
        message:" API UP AND RUNNING"
    })
})

app.get('/writeToTopic',(req,res) =>{

    const payloads = [
        {
          topic: process.env.TOPIC,
          messages: 'testing kafka success',
        },
      ]
  
      producer.send(payloads, (err, data) => {
        if (err) {
          console.log(err);
        }
        console.log(data);
      })
})

app.listen(process.env.PORT, () => {
    console.log('Base Service App-Up and Running at port', process.env.PORT)
})