import { useEffect } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

// Components
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"

function Home() {

  const { workouts, dispatch } = useWorkoutsContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts')
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'SET_WORKOUTS', payload: json })
      }
    }
    fetchWorkouts()
  }, [dispatch])

  return (
    <div className="home container">
      <div className="workouts row row-cols-1 row-cols-sm-2 row-cols-md-4">
        {workouts && workouts.map((workout) => (
          <WorkoutDetails key={workout._id} workout={workout} />
        ))}
      </div>
      <WorkoutForm />
    </div>
  )
}

export default Home