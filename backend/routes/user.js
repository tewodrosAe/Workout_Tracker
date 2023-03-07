const express = require('express')

const {loginUser,signupUser} = require('../controllers/userControllers')

const router = express.Router()


// user login
router.post('/login',loginUser)


// user signup 
router.post('/signup',signupUser)

module.exports = router