const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const auth = async (req,res,next) =>{
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded= jwt.verify(token, process.env.JWT_SIGN)
        const user =  await User.findOne({_id: decoded._id, 'tokens.token': token})
        if(!user){
            // eslint-disable-next-line no-throw-literal
            throw 'Please Authenticate'
        }
        req.token = token
        req.user= user
        next()
    }catch(e){
        res.status(400).send(e)
    }
}

module.exports= auth;