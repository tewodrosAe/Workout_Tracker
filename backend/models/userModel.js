const mongoose = require('mongoose')
const validator = require('validator')
const bcrpyt = require('bcrypt')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.statics.signup = async function (email,password) {
    if(!email || !password){
        throw Error('Email and Password must be filled')
    }
    
    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password is not strong')
    }
    const exists = await this.findOne({email})

    if(exists){
        throw Error('email already in use')
    }

    const salt = await bcrpyt.genSalt(10)

    const hash = await bcrpyt.hash(password,salt)

    const user = await this.create({email,password:hash})

    return user
}

userSchema.statics.login = async function ({email,password}){
    if(!email || !password){
        throw Error('Email and password must be filled')
    }
    const user = await this.findOne({email})

    if(!user){
        throw Error('incorrect email')
    }
    const check = await bcrpyt.compare(password,user.password)

    if(!check){
        throw Error('incorrect password')
    }

    return user
}
 
module.exports = mongoose.model('User',userSchema)