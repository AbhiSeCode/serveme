/* eslint-disable no-throw-literal */
const express= require('express');
const auth = require('../middleware/auth');
const Item = require('../models/itemModel');
const Order = require('../models/orderModel');


const router = express.Router()


router.get('/',auth, async(req, res)=>{
        try{
            if(req.user.role === 'admin' || req.user.role === 'employee' ){
                await Order.find()
                .then((orders)=> res.status(200).send(orders.reverse()))
                .catch((err)=> {
                    throw {status: 400, msg: 'Something went wrong'}
                })
            }else{
                res.status(200).send(req.user.orders)
            }
        }catch(err){
            res.status(err.status || 500).send(err.msg)
        }       
})

router.post('/placeOrder', auth, async(req, res)=>{
    try{
        let userOrder = []
        let time= 0
        const amount = []
        const order = req.body.order
        const orderIds= order.map(item=> item._id)
        const menu = await Item.find({_id : {$in: [...orderIds]}, availability: true}).select('name price preTime availability').lean()
        if(menu.length === order.length){
            for (const menuItem of menu){
                for(const orderItem of order){
                    if(menuItem._id.toString() === orderItem._id){
                        userOrder = userOrder.concat({...orderItem, name:menuItem.name, price: menuItem.price})
                        const price = menuItem.price * orderItem.quantity
                        time= time + menuItem.preTime
                        amount.push( price)
                    }
                }      
            }  
        }else{
           throw {status: 400, msg:'There is some issue in your order. Please try again'}
       }
        const total = amount.reduce((acc, crr)=> acc +  crr )
        const newOrder = new Order({userName: req.user.username,
            userId: req.user._id,
            orderNumber: req.body.orderNumber,
            items: userOrder,
            amount : parseFloat(Math.floor(total * .18) + total),
            time: time + 20
        })
        await newOrder.save()
        req.user.orders= [newOrder, ...req.user.orders]
        await req.user.save()
        res.status(200).send(req.user)
    }catch(err){
        res.status(err.status || 500).send(err.msg)
    }
})


module.exports= router;
