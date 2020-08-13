const mongoose = require('mongoose');

const itemSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price:{
        type: Number,
        required: true,
        trim: true
    },
    time:{
        type: Number,
        required: true,
        trim: true
    },
    category:{
        type: String,
        required: true,
        trim: true
    }
},{
    timestamps: true
})

itemSchema.statics.gettingItems = async(items)=>(
    Promise.all(items.map(async(item)=>{
        const itemDetail=  await Item.findById(item.id)
        return ({name: itemDetail.name, price: itemDetail.price , quantity: item.quantity, totalPrice: itemDetail.price * item.quantity})
    }))
)

const Item = mongoose.model('Item', itemSchema)

module.exports= Item;