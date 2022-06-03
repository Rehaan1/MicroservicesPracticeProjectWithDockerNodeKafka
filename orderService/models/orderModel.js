const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  orderItems: {
    type: Map,
    of: String,
    default: {},
    required: true,
  }
})

const Order = mongoose.model('order', orderSchema)

module.exports = Order
