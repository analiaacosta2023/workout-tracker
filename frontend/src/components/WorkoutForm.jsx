import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

function WorkoutForm() {

    const { dispatch } = useWorkoutsContext()

    const [category, setCategory] = useState('')
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const workout = { category, title, load, reps, description }
        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setCategory('')
            setTitle('')
            setLoad('')
            setReps('')
            setDescription('')
            setError(null)
            setEmptyFields([])
            console.log('New workout added', json)
            dispatch({type: 'CREATE_WORKOUT', payload: json})
        }
    }

    return (
        <div className="card">
            <form className="create" onSubmit={handleSubmit}>
                <h3>Add a New Workout</h3>
                <label>Category:</label>
                <select value={category} onChange={e => setCategory(e.target.value)} className={emptyFields.includes('category') ? 'error' : ''}>
                    <option value="" disabled>Select category</option>
                    <option value={'Arms'} >Arms</option>
                    <option value={'Back'} >Back</option>
                    <option value={'Calves'} >Calves</option>
                    <option value={'Cardio'} >Cardio</option>
                    <option value={'Chest'} >Chest</option>
                    <option value={'Core'} >Core</option>
                    <option value={'Glutes'} >Glutes</option>
                    <option value={'Legs'} >Legs</option>
                    <option value={'Shoulders'} >Shoulders</option>
                </select>

                <label>Excersize Title:</label>
                <input
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    className={emptyFields.includes('title') ? 'error' : ''} />

                <label>Load (in kg):</label>
                <input
                    type="number"
                    onChange={(e) => setLoad(e.target.value)}
                    value={load}
                    className={emptyFields.includes('load') ? 'error' : ''} />

                <label>Reps:</label>
                <input
                    type="number"
                    onChange={(e) => setReps(e.target.value)}
                    value={reps}
                    className={emptyFields.includes('reps') ? 'error' : ''} />
                <label>Adicional Information:</label>
                <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    value={description} />
                <button>Add Workout</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>

    )
}

export default WorkoutForm