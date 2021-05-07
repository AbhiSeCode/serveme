/* eslint-disable no-throw-literal */

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const validator= require('validator');
const bcrypt= require('bcryptjs');


const userSchema= new mongoose.Schema({
    address:[{
        type: String,
        required: true,
        trim: true
    }],
    dob:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    tokens:[{
        token:{
            type:String,
            required: true 
        }
    }],
    orders:[{}],
    mobile:{
        type: Number,
        required: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength: 7
    },
    username:{
        type: String,
        required: true,
        trim: true
    },
    role:{
        type: String,
        required: true,
        trim: true
    },
    avatar:{
        type: Buffer
    },
    isVerified:{
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})

userSchema.pre('save',async function(next){
    const mobile= this.mobile.toString()
    if(!validator.isEmail(this.email)){
        throw {_message: 'Email is Invalid!'}
    }
    else if(!validator.isMobilePhone(mobile, ['en-IN'])){
        throw {_message: 'Mobile Number is Invalid!'}
    }
    next()
})



userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password= this.password.trim()
        this.password =  await bcrypt.hash(this.password, 8)
    }
    next()
})


userSchema.methods.generateToken= async function(time = '30d'){
    const token = jwt.sign({_id: this.id.toString(), role: this.role}, process.env.JWT_SIGN, {expiresIn: time})
    this.tokens= this.tokens.concat({token})
    await this.save()
    return token
}



userSchema.statics.findAndVerify = async(email, password)=>{
    const errMessage= 'Email or Password is incorrect!'
    const user= await User.findOne({email: email})
    if(!user){
       throw errMessage
    }
    const isMatch= await bcrypt.compare(password, user.password)
    if(!isMatch){ 
        throw errMessage
    }
    return Promise.resolve(user)
}

const User= mongoose.model('User', userSchema)

module.exports = User;