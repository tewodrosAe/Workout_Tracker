
const express = require('express')
const dotenv = require('dotenv')
const mongoose =  require('mongoose')

// routes 
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

// express app
const app = express()

// enviroment configuration
dotenv.config()

// middleware

app.use(express.json())
app.use((req,res,next) => {
    console.log(req.method,req.path)
    next()
})

// routes
app.use(('/api/workouts'), workoutRoutes)
app.use(('/api/user'),userRoutes)

// connect db
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, () => console.log(`mongodb connected and listening on port ${process.env.PORT}`))
})
.catch((error) => console.log(error))