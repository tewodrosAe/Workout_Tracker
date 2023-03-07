import { useAuthContext } from "./useAuthContext"
import { useWorkoutscontext } from "./useWorkoutContext"

export const useLogout = () => {
    const {dispatch} = useAuthContext()
    const {dispatch: workoutDispatch} = useWorkoutscontext()
    const logout = () => {
        // local storage
        localStorage.removeItem('user')

        // authcontext
        dispatch({type:'LOGOUT'})
        
        // workout context
        workoutDispatch({type:'SET_WORKOUT',payload:null})
    }

    return {logout}
}