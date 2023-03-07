import { useEffect, useState } from 'react';
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import { useWorkoutscontext } from '../hooks/useWorkoutContext';
import { useAuthContext } from '../hooks/useAuthContext';

const Home = () => {
  const {workouts,dispatch} = useWorkoutscontext()
  const { user } = useAuthContext()
  const [isLoading,setIsLoading] = useState()
  
  useEffect(() => {
    const workoutFun = async () => {
      setIsLoading(true)
      const resp = await fetch('/api/workouts',{
        headers:{
          "Authorization": `Bearer ${user.token}`
        }
      })
      const respJson = await resp.json()
      if(resp.ok){
        setIsLoading(false)
        dispatch({type:'SET_WORKOUT', payload:respJson})
      }
       }
    if(user){
      workoutFun()
    }
  },[dispatch,user])
  return (
    <div className="home">
        <div className="workouts">
          {isLoading && <h3 style={{color:'gray',fontWeight:'normal',marginLeft:300}}>Loading...</h3>}
          {workouts && workouts.map((workout) => <WorkoutDetails key={workout._id} workout={workout}/>)}
        </div>
        <WorkoutForm/>
    </div>
  )
}

export default Home