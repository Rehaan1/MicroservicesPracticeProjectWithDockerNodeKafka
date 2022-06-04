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

console.log('Connecting to Kafka in Base Service....')

const client = new kafka.KafkaClient({
    kafkaHost:
      process.env.ENVIRONMENT === 'local'
        ? process.env.INTERNAL_KAFKA_ADDR
        : process.env.EXTERNAL_KAFKA_ADDR,
  });

const Admin = kafka.Admin;
const Consumer = kafka.Consumer;

const admin = new Admin(client);

const interval_id = setInterval(() => {

  admin.listTopics((err, res) => {

    if (res[1].metadata[process.env.TOPIC]) {

      console.log('Kafka topic created')
      clearInterval(interval_id)

      const consumer = new Consumer(
          client,
          [
            {
              topic: process.env.TOPIC,
              partition: 0,
            },
          ],
          {
            autoCommit: false,
          },
        )
      
      consumer.on('message', message => {
        console.log('Order Placed:',message);
      })
      
      consumer.on('error', err => {
        console.log(err);
      })

    } else {
      console.log('Waiting for Kafka topic to be created');
    }
  });
}, 1000);

app.use('/user',userAuthRoute)
app.use('/order',orderRoute)


app.get('/', (req,res) => {
    return res.status(200).json({
        message:" API UP AND RUNNING"
    })
})

app.listen(process.env.PORT, () => {
    console.log('Base Service App-Up and Running at port', process.env.PORT)
})