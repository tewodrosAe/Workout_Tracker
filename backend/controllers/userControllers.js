const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
// login controllers

const createAToken = (_id) => {
    return jwt.sign({_id},process.env.SECRET,{ expiresIn: '3d'})
}
const loginUser = async (req,res) => {
    const {email,password} = req.body
    try{
        const user = await User.login({email,password})
        const token = createAToken(user._id)
        res.status(200).json({email,token})
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}

// signup controllers

const signupUser = async (req,res) => {
        const {email,password} = req.body
        try{
            const user = await User.signup(email,password)
            const token = createAToken(user._id)
            res.status(200).json({email,token})
        }
        catch(error){
            res.status(404).json({error:error.message})
        }
    }


module.exports = {
    signupUser,
    loginUser
}