import { useState } from "react"
import { useWorkoutscontext } from "../hooks/useWorkoutContext"
import { useAuthContext } from "../hooks/useAuthContext"

function WorkoutForm() {
  const[title,setTitle] = useState('')
  const[reps,setReps] = useState('')
  const[load,setLoad] = useState('')
  const[error,setError] = useState(null)
  const {dispatch} = useWorkoutscontext()
  const {user} = useAuthContext()
  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!user){
      setError('Not logged in ')
      return
    }
    const workout = {title,reps,load} 
    const response =  await fetch('/api/workouts',{
        method: 'POST',
        body: JSON.stringify(workout),
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        }})
    const json =  await response.json()
  
    console.log(json)
    if(response.ok){
        setTitle('')
        setReps('')
        setLoad('')
        setError(null)
        dispatch({type:'CREATE_WORKOUTS',payload:json})
    }
    if(!response.ok){
        setError(json.error)
    }
  } 
  return (
    <form className="create" onSubmit={handleSubmit}>
        <h3>Add a new Workout</h3>
        <label>Excercise title:</label>
        <input 
        name="title"
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
         />
        <label>Load (in kg):</label>
      <input 
        type="number" 
        onChange={(e) => setLoad(e.target.value)} 
        value={load}
      />

      <label>Number of Reps:</label>
      <input 
        type="number" 
        onChange={(e) => setReps(e.target.value)} 
        value={reps} 
      />
      <button>Add Workout</button>  
      
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default WorkoutForm