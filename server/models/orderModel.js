const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userName:{
        type:String,
        required: true,
        trim: true
    },
    userId: {
        type:String,
        required: true,
        trim: true
    },
    orderNumber:{
        type:String,
        trim: true,
        required: true
    },
    status:{
        type:String,
        default: 'placed'
    },
    items:{
        type: [Map],
        of: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    time: {
        type: Number,
        require: true
    }
},{
    timestamps: true
})

const Order= mongoose.model('Order', orderSchema)

module.exports= Order;