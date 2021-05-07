/* eslint-disable no-throw-literal */
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const auth = async (req,res,next) =>{
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded= jwt.verify(token, process.env.JWT_SIGN)
        const user =  await User.findOne({_id: decoded._id, role: decoded.role, 'tokens.token': token})
        req.token = token
        req.user= user
        next()
    }catch(e){
        res.status(401).send({status: 401, msg: "Unauthorized"})
    }
}

module.exports= auth;