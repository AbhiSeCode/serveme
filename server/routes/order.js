const express= require('express');
const Order = require('../models/orderModel');
const auth = require('../middleware/auth');
const Item = require('../models/itemModel');

const router = express.Router()

router.post('/add', auth, async(req, res)=>{
    const order = new Order({
        userId: req.user._id,
        employeeId: req.body.employeeId,
        status: req.body.status,
        items: req.body.items,
        amount: req.body.amount
    })
    await order.save()
    res.status(201).send(order)
})

router.get('/menu/:category', async(req, res)=>{
        try{
            console.log(req.params.category)
            const items= await Item.find({category: req.params.category})
            res.status(202).send(items)
        }catch(e){
            res.status(400).send(e)
        }       
})

router.post('/confirmOrder', auth, async(req, res)=>{
    try{
        console.log('Anything', req.body)
        req.user.orders= req.user.orders.concat({order: req.body.order, timestamp: req.body.timestamp})
        await req.user.save()
        // const newOrder= new Order({_id:req.user.orders[req.user.orders.length-1]._id, userId: req.user._id, status: 'Pending', items: req.body.order})
        // await newOrder.save()
        res.status(200).send(req.user)
    }catch(e){
        res.status(400).send(e)
    }
})

module.exports= router;
