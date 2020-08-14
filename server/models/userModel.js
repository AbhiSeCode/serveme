const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const validator= require('validator');
const bcrypt= require('bcryptjs');


const userSchema= new mongoose.Schema({
    address:{
        type: String,
        require: true,
        trim: true
    },
    dob:{
        type: String,
        require: true,
        trim: true
    },
    email:{
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    tokens:[{
        token:{
            type:String,
            required: true 
        }
    }],
    orders:[{
        order:{
            type: [Map],
            of: String
        }
    ,
    timestamp:{
            type : String
        }
    }],
    mobile:{
        type: Number,
        require: true,
        trim: true,
        trim: true
    },
    password:{
        type: String,
        require: true,
        trim: true,
        minlength: 7
    },
    username:{
        type: String,
        require: true,
        trim: true
    }
},{
    timestamps: true
})

userSchema.pre('save',async function(next){
    const mobile= this.mobile.toString()
    if(!validator.isEmail(this.email)){
        throw 'Email is not valid!'
    }
    else if(!validator.isMobilePhone(mobile, ['en-IN'])){
        throw 'Mobile Number is not valid!'
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


userSchema.methods.generateToken= async function(){
    const token = jwt.sign({_id: this.id.toString()}, 'thisismytoken', {expiresIn: "7d"})
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