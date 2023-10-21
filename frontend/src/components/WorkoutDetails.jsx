import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

function WorkoutDetails({ workout }) {

    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()

    const handleClick = async () => {

        if (!user) {
            return
        }

        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        if (response.ok) {
            dispatch({ type: 'DELETE_WORKOUT', payload: json })
        }
    }

    return (
        <div className='card mb-3'>

            <div className="row g-0">
                <div className="col-md-4">
                    <img src={workout.gifUrl} className="img-fluid rounded-start" alt="..." />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title text-secondary">{workout.name}</h5>
                        <p className="card-text"><strong>Load (kg): </strong>{workout.load}</p>
                        <p className="card-text"><strong>Reps (kg): </strong>{workout.reps}</p>
                        <p className="card-text"><small className="text-body-secondary">{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</small></p>
                    </div>
                </div>
                <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
            </div>

        </div>
    )
}

export default WorkoutDetails