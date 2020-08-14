const express= require('express');
const Item= require('../models/itemModel');
const auth = require('../middleware/auth');

const router = express.Router()

router.post('/add', async (req, res)=>{
    try{
        const item = new Item(req.body)
        await item.save()
        res.status(201).send(item)
    }catch(e){
        res.status(400).send(e)
    }
})

router.post('/ordereditems', async(req,res)=>{
    try{
        console.log(req.body)
        const items= req.body.items
        const finalItems= await Item.gettingItems(items)
        res.status(200).send(finalItems)
    }catch(e){
        res.status(400).send(e)
    }
})

module.exports= router;