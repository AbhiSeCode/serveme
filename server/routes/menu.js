/* eslint-disable no-throw-literal */
const express = require('express')
const {upload} = require('../middleware/multer')
const auth  = require ('../middleware/auth')
const Item = require('../models/itemModel');

const router = express.Router()

router.get('/', async(req,res)=>{
    try{
        const items= await Item.find().select("name price availability detail category preTime img")
        res.status(200).send(items)
    }catch(e){
        res.status(400).send({msg: 'Something went wrong'})
    }      
})

router.post('/additem', upload.single('img') , auth, async (req, res)=>{
    try{
        if(req.user.role === "employee"){
            const item = new Item({...req.body, img: req.file.originalname})
            if(!item){
                throw {status: 400, msg: 'Fill all required field'}
            }
            await item.save()
            res.status(201).send(item)
        }else{
            throw {status: 401, msg: 'Unauthorized'}
        }
    }catch(err){
        res.status(err.status || 500).send(err.msg)
    }
})


router.patch('/edititem', auth, upload.single('img'), async(req,res)=>{
    try{
        if(req.user.role === "employee"){
            if(req.file) req.body.img = req.file.originalname
            await Item.findByIdAndUpdate(req.body._id, req.body)
            .then((item)=>{
                res.status(201).send('Item Updated')
            })
            .catch((err)=>{
                throw {status: 400, msg: "Item doesn't exist"}
            })
        }else{
            throw {status: 401, msg: 'Unauthorized'}
        }
    }catch(err){
        res.status(err.status || 500).send(err)
    }
})

router.delete('/item', auth, async(req,res)=>{
    try{
        if(req.user.role === "employee"){
            await Item.deleteOne({_id: req.body._id})
            .then((item)=>{
                if(item.n){
                    res.status(200).send('Deleted.')

                }else{
                    throw {status: 400, msg: "Item not found"}
                }
            })
            .catch((err)=> {
                if(err.status){
                    throw {status: err.status, msg: err.msg}
                }else{
                    throw {status: 400, msg: 'Invalid ID!'}
                }
            })
        }
        else{
            throw {status: 401, msg: 'Unauthorized'}
        }
    }catch(err){
        res.status(err.status || 500).send(err)
    }
})

router.patch('/disable', auth, async(req,res)=>{
    try{
        if(req.user.role === "employee"){
            await Item.updateMany({}, {availability: false})
            .then((item)=>res.status(201).send('Items Updated'))
            .catch((err)=>{
                throw {status: 500, msg: "Something went wrong"}
            })
        }else{
            throw {status: 401, msg: "Unauthorized"}
        }
    }catch(err){
        res.status(err.status || 500).send(err.msg)
    }
})

router.patch('/enable', auth, async(req,res)=>{
    try{
        if(req.user.role === "employee"){
            await Item.updateMany({}, {availability: true})
            .then((item)=>res.status(201).send('Items Updated'))
            .catch((err)=>{
                throw {status: 500, msg: "Something went wrong"}
            })
        }else{
            throw {status: 401, msg: "Unauthorized"}
        }
    }catch(err){
        res.status(err.status || 500).send(err.msg)
    }
})
module.exports = router
