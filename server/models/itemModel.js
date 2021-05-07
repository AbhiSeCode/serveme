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
    availability:{
        type: Boolean,
        default: true
    },
    preTime:{
        type: Number,
        required: true,
        trim: true
    },
    detail:{
        type: String,
        trim: true
    },
    img: {
        type: String,
        required: true
    },
    category:{
        type: String,
        default: 'veg'
    }
},{
    timestamps: true
})

// itemSchema.statics.gettingItems = async(items)=>(
//     Promise.all(items.map(async(item)=>{
//         const itemDetail=  await Item.findById(item.id)
//         return ({name: itemDetail.name, price: itemDetail.price , quantity: item.quantity, totalPrice: itemDetail.price * item.quantity})
//     }))
// )

const Item = mongoose.model('Item', itemSchema)

module.exports= Item;