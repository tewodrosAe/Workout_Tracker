const express = require('express')
const requireAuth = require('../middleware/requireAuth')
const route = express.Router()

const { 
    createWorkout,
    updateWorkout,
    deleteWorkout,
    getWorkout,
    getWorkouts
} = require('../controllers/workoutController')

route.use(requireAuth)

route.get('/', getWorkouts)

route.get('/:id', getWorkout)

route.post('/', createWorkout)

route.delete('/:id',deleteWorkout)

route.patch('/:id',updateWorkout)

module.exports = route