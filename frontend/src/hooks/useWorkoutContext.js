import { WorkoutContext } from "../contexts/WorkoutContext";
import { useContext } from "react";

export const useWorkoutscontext = () => {
    const context = useContext(WorkoutContext)

    if(!context) {
        throw Error('useWorkoutsContext must be used inside a WorkoutsContextProvider')
      }
    
    return context
}