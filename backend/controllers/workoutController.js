const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

//get all workout
const getWorkouts = async(req,res) => {
    const user_id = req.user._id
    console.log(req.user)
    const workouts = await Workout.find({ user_id }).sort({createdAt: -1})

    res.status(200).json(workouts)
}

//post a workout
const createWorkout = async (req,res) => 
{
    
    const {title,reps,load} = req.body
    try
    {
        const user_id= req.user._id
        const workout = await Workout.create({title,reps,load,user_id})
        res.status(200).json(workout)
    }
    catch(error){
        res.status(400).json({error : error.message})
    }
}

//get a  single workout
const getWorkout = async(req,res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({err:"sorry dog you aint got it"})
    }
    const workout = await Workout.findById(id)
    if(!workout){
        return res.status(404).json({err:"sorry dog you aint got it"})
    }
    res.status(200).json({workout})
}

// delete a workout
const deleteWorkout = async(req,res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'not lucky buddy id'})
    }

    const workout = await Workout.findOneAndDelete({_id : id})
    if(!workout){
        return res.status(404).json({error:'not lucky buddy'})
    }
    res.status(200).json({workout})
}

// update a workout
const updateWorkout = async(req,res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'not lucky buddy'})
    }
    const workout = await Workout.findOneAndUpdate({_id:id},{...req.body})
    if(!workout){
        return res.status(404).json({error:'not lucky buddy'})
    }
    res.status(200).json({workout})
}
module.exports = {
    createWorkout,
    getWorkout,
    getWorkouts,
    updateWorkout,
    deleteWorkout
}