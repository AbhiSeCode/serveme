const express= require('express');
const auth = require('../middleware/auth');
const Item = require('../models/itemModel');

const router = express.Router()

// router.post('/add', auth, async(req, res)=>{
//     const order = new Order({
//         userId: req.user._id,
//         employeeId: req.body.employeeId,
//         status: req.body.status,
//         items: req.body.items,
//         amount: req.body.amount
//     })
//     await order.save()
//     res.status(201).send(order)
// })

router.get('/menu/:category', async(req, res)=>{
        try{
            const items= await Item.find({category: req.params.category})
            res.status(202).send(items)
        }catch(e){
            res.status(400).send(e)
        }       
})

router.post('/confirmOrder', auth, async(req, res)=>{
    try{
        req.user.orders= req.user.orders.concat({order: req.body.order, timestamp: req.body.timestamp})
        await req.user.save()
        res.status(200).send(req.user)
    }catch(e){
        res.status(400).send(e)
    }
})

module.exports= router;
