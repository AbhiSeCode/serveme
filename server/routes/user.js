/* eslint-disable no-throw-literal */
const express = require('express');
const User= require('../models/userModel');
const auth= require('../middleware/auth');
const {dp}= require('../middleware/multer');
const bcrypt= require('bcryptjs');
const {sendWelcomeMail, sendResetMail, sendContactUsMail} = require('../email/account');

const router = express.Router();


router.post('/signup', dp.single('dp'), async(req,res)=>{
    try{
        if(req.file) req.body.avatar = req.file.buffer
        const user = new User({...req.body})

        if(!req.body.role){
            user.role = "user"
        }
        await user.save()
        sendWelcomeMail(user.email, user.username)
        res.status(201).send({msg:"Account Created"})
    }catch(err){ 
        if(err.code=== 11000){
            res.status(400).send({msg: "Email is already registered"})
        }
        else{
            res.status(500).send({msg: `${err._message}`})
        }
    }
})

router.post('/login', async(req,res)=>{
    try{
        await User.findAndVerify(req.body.email, req.body.password)
        .then(async(user)=>{
            const token= await user.generateToken()
            res.status(200).send({token, role: user.role})    
        })
        .catch(err=>{
            throw {status: 400, msg: 'Email or Password in incorrect'}
        })
    }catch(err){
        res.status(err.status || 500).send(err)
    }
})


router.delete('/logout', auth, async(req,res)=>{
    try{
        const tokens= req.user.tokens
        req.user.tokens = tokens.filter((token)=> token.token !== req.token)
        await req.user.save()
        res.status(200).send({msg: "Logged Out"})
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/me',auth, async(req,res)=>{
    try{
        const user= {
            username : req.user.username,
            email: req.user.email, 
            mobile: req.user.mobile, 
            dob: req.user.dob, 
            address: req.user.address,
            avatar: req.user.avatar
        }
        res.status(200).send(user)
    }catch(e){
        res.status(500).send(e)
    }
})

router.patch('/me', auth, dp.single('dp'), async(req,res)=>{
    if(req.file) req.body.avatar= req.file.buffer
    const updates= Object.keys(req.body)
    try{
        if(req.body.email){
            throw {status: 403, msg: "You can't update your email"}
        }
        else if(req.body.oldPassword){
            const isMatch = await bcrypt.compare(req.body.oldPassword, req.user.password)
            if(!isMatch) throw {status: 400, msg: "Incorrect old password"}
            else{
                updates.pop('oldPassword')
                req.user.password= req.body.password 
                updates.pop('password')
            }
        }
        updates.forEach(update=>{
            if(req.user[update]) req.user[update] = req.body[update]
            else throw {status: 406, msg: "You can't create new field"}
        })
        await req.user.save()
        res.status(200).send(req.user)
    }catch(e){
        res.status(e.status || 500).send(e)
    }     
})

router.post('/forgetpassword', async(req,res)=>{
    try{
        const user = await User.findOne({email:req.body.email})
        if(!user){
            throw {msg:"Can't find your account"}
        }
        const token= await user.generateToken(6000)
        sendResetMail(req.body.email, req.headers.origin, token)
        res.status(200).send(`${req.headers['x-forwarded-host']}${token}`)        
    }catch(err){
        res.status(404).send(err.msg)
    }
})

router.post('/contactus', async(req,res)=>{
    try{
        sendContactUsMail({...req.body})
        res.status(200).send('done')

    }catch(e){
        res.stats(400).send({msg: 'Something went wrong'})
    }
})


router.delete('/employee', auth, async(req,res)=>{
    try{
        if(req.user.role === "admin"){
            await User.deleteOne({_id: req.body._id})
            .then((user)=>{
                if(user.n){
                    res.status(200).send('Deleted.')

                }else{
                    throw {status: 400, msg: "User Not Found"}
                }
            })
            .catch((err)=> {
                if(err.status){
                    throw { status: err.status, msg: err.msg}
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


router.get('/employees', auth, async(req,res)=>{
        try{
            if(req.user.role === 'admin'){
                    const employee = await User.find({role: 'employee'}).select('username createdAt email dob mobile address')
                    res.status(200).send(employee.reverse())
            }else{
                throw {status: 401, msg: 'Unauthorized'}
            }
        }catch(err){   
            res.status(err.status).send(err)
        }
})


module.exports = router;