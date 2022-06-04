const router = require('express').Router()
const redis = require('redis')
const kafka = require('kafka-node');
const verify = require('../middleware/verifyToken')
const Order = require('../../models/orderModel')

const client = redis.createClient({
    url: 'redis://@redis:6379'
})

client.on('error', (err) => {
    console.log('Redis Client Error',err)
})

client.connect()
    .then(()=>{
        console.log("Redis Connected in Place Order")
    })
    .catch((err) => {
        console.log(err)
    })

console.log('Connecting to Kafka in Order Service....')

const kafClient = new kafka.KafkaClient({
    kafkaHost:
      process.env.ENVIRONMENT === 'local'
        ? process.env.INTERNAL_KAFKA_ADDR
        : process.env.EXTERNAL_KAFKA_ADDR,
  });

const Producer = kafka.Producer;
const producer = new Producer(kafClient);

producer.on('ready', () => {
    console.log("KAFKA PRODUCER READY..........")
})

producer.on('error', (err) => {
    console.log('KAFKA ERROR', err)
})

router.get('/', verify, (req,res) => {

    client.hGetAll('cart:'+req.user._id)
    .then((value)=>{

        value = JSON.parse(JSON.stringify(value))

        console.log(value)
        
        if(Object.keys(value).length === 0)
        {
            return res.status(200).json({
                status: 400,
                message:"Cart Empty"
            })
        }

        const order = new Order({
            userId: req.user._id,
            orderItems: value
        })

        const payloads = [
            {
              userId: req.user._id,
              topic: process.env.TOPIC,
              order: value,
            },
          ]
      
        producer.send(payloads, (err, data) => {
            if (err) {
              console.log(err);
            }
            console.log(data);
          })

        order.save()
            .then((order) => {
                if(order)
                {
                    client.del('cart:'+req.user._id)
                    .then(()=>{
                        
                        Order.find({userId: req.user._id})
                            .then((orders) => {
                                return res.status(200).json({
                                    status:200,
                                    message: 'Order Placed',
                                    orders: orders
                                })
                            })
                            .catch((err) => {
                                return res.status(200).json({
                                    status: 500,
                                    message:"Order Placing Error",
                                    error : err
                                })
                            })

                    })
                    .catch((err) => {
                        console.log(err)
                        return res.status(200).json({
                            status: 500,
                            message:" Redis DEL Error",
                            error : err
                        })
                    })    
                }
            })
            .catch((err) => {
                return res.status(200).json({
                    status: 500,
                    message:"Order Placing Error",
                    error : err
                })
            })
        
    })
    .catch((err) => {

        console.log(err)

        return res.status(200).json({
            status: 500,
            message:" Redis HGETALL Error",
            error : err
        })
    })
})


module.exports = router
