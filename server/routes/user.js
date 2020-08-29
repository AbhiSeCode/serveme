/* eslint-disable no-throw-literal */
const express = require('express');
const User= require('../models/userModel');
const auth= require('../middleware/auth');
const bcrypt= require('bcryptjs');
const multer= require('multer');
const {sendWelcomeMail, sendResetMail} = require('../email/account');

const router = express.Router();


const upload = multer({
    limits:{
        fileSize: 1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload an image!'))
        }
        cb(undefined,true)
    }
})

router.post('/signup',async(req,res)=>{
    try{
        if(isNaN(req.body.mobile)){
            throw 'Mobile Number is Invalid'
        }
        const user= new User(req.body)
        await user.save()
        const token= await user.generateToken()
        sendWelcomeMail(user.email, user.username)
        res.status(201).send({token})
    }catch(err){ 
        if(err.code=== 11000){
            res.status(400).send('Email Already Registered')
        }
        else{
            console.log(err)
            res.status(400).send(err)
        }
    }
})

router.post('/login', async(req,res)=>{
    try{
        const user= await User.findAndVerify(req.body.email, req.body.password)
        const token= await user.generateToken()
        res.status(200).send(token)    
    }catch(err){
        res.status(401).send(err)
    }
})


router.get('/dashboard', auth, async(req,res)=>{
    try{
        const orders= req.user.orders
        if(orders.length !== 0){
            res.status(200).send(orders)
        }
        else{
            res.status(204).send()
        }
    }catch(e){
        res.status(400).send(e)
    }
})


router.delete('/logout', auth, async(req,res)=>{
    try{
        const tokens= req.user.tokens
        req.user.tokens = tokens.filter((token)=> token.token !== req.token)
        await req.user.save()
        res.send(req.user.tokens)
    }catch(e){
        res.send(e)
    }
})

router.get('/me',auth, async(req,res)=>{
    try{
        const user= {
            username : req.user.username,
            email: req.user.email, 
            mobile: req.user.mobile, 
            dob: req.user.dob, 
            address: req.user.address
        }
        res.status(200).send(user)
    }catch(e){
        res.status(500).send(e)
    }
})

router.patch('/me', auth, async(req,res)=>{
    const updates= Object.keys(req.body)
    try{
        if(req.body.oldPassword){
            const isMatch = await bcrypt.compare(req.body.oldPassword, req.user.password)
            if(!isMatch){
                throw 'Old Password is incorrect!'
            }
            else{
                updates.pop('oldPassword')
                req.user.password= req.body.password 
                updates.pop('password')
            }
        }
        updates.forEach(update=>req.user[update] = req.body[update])
        await req.user.save()
        res.status(200).send(req.user)
    }catch(e){
        res.status(400).send(e)
    }     
})


router.post('/me/avatar', auth, upload.single('avatar'), async(req,res)=>{
    console.log(req.file)
    
})

router.post('/forgetpassword', async(req,res)=>{
    try{
        const user = await User.findOne({email:req.body.email})
        if(!user){
            throw "User doesn't exist"
        }
        const token= await user.generateToken(600)
        sendResetMail(req.body.email, req.headers.origin, token)
        res.status(200).send(`${req.headers['x-forwarded-host']}${token}`)        
    }catch(err){
        console.log(err)
        res.status(400).send(err)
    }
})


module.exports = router;