const mongoose = require('mongoose')
const validator= require('validator');
const bcrypt =require('bcryptjs')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    name:{
        type: String,
            required: true,
            trim: true,
    },
    age:{
        type: Number,
    default: 0,
            validate(value){
            if(value<0){
                throw new Error("Age is not a positive number")
            }

        }
    },
    email:{
        type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
            validate(value) {
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid")
            }
        }
    },
    password:{
        type: String,
            required: true,
            trim: true,
            minLength: 7,
            validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('password cannot contain "password')

            }
        }
    },
    tokens:[{
        token:{
            type: String,
            require: true,
        }
    }]

})

userSchema.statics.findByCredentials = async (email, password) =>{
    const user = await User.findOne({email})
   console.log(email,password,user)
    if(!user){
        throw  new Error("Unable to Login User not exists")
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error("Incorrect password")
    }
    user.message = "login successful";
    return user;
}

//Generate json web token
userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, "thisismynewcourse");
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token;
}

//Hash The Plain Text password before saving
userSchema.pre('save', async function (next){
    const user = this;
    console.log(user)
    console.log("Just befor saving ")
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})
const User = mongoose.model('User', userSchema)

module.exports = User;