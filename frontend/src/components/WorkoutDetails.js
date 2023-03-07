import { useWorkoutscontext } from "../hooks/useWorkoutContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from "../hooks/useAuthContext"

function WorkoutDetails({workout}) {
  const {dispatch} = useWorkoutscontext()
  const {user} = useAuthContext()
  
  const handleDelete = async () =>{
    if(!user){
      return
    }
    const response = await fetch('/api/workouts/'+ workout._id, {
      method:'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
  
  }})
    
    const json = await response.json()

    if(response.ok){
      dispatch({type:'DELETE_WORKOUT',payload:json})
    }
  }

  return (
    <div className="workout-details">
        <h4> {workout.title} </h4>
        <p> <strong>Load(Kg): </strong> {workout.load} </p>
        <p> <strong>Reps: </strong>{workout.reps}</p>
        <p style={{color:'gray',opacity:0.8,fontSize:13,marginTop:4}}>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix:true })}</p>
        <span className="material-symbols-outlined" onClick={handleDelete}>delete</span>
    </div>
  )
}

export default WorkoutDetails