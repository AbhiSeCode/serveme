const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId:{
        type:String,
        required: true,
        trim: true
    },
    employeeId:{
        type:String,
        trim: true
    },
    status:{
        type:String,
        required: true,
        trim: true
    },
    items:{
            type: [Map],
            of: String,
            required: true
    },
    amount: {
        type: Number,
    }
},{
    timestamps: true
})

const Order= mongoose.model('Order', orderSchema)

module.exports= Order;