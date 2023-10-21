import { useState, useEffect } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"

import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


function WorkoutForm() {

    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()

    const [category, setCategory] = useState('')
    const [exerciseList, setExerciseList] = useState('')
    const [exercise, setExercise] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState(null)
    /* const [emptyFields, setEmptyFields] = useState([]) */

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }
        const newExercise = exerciseList.find((e) => e.id === exercise)

        const workout = { ...newExercise, load, reps, description }

        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        if (!response.ok) {
            setError(json.error)
            /* setEmptyFields(json.emptyFields) */
        }
        if (response.ok) {
            setCategory('')
            setExercise('')
            setLoad('')
            setReps('')
            setDescription('')
            setError(null)
            /* setEmptyFields([]) */
            console.log('New workout added', json)
            dispatch({ type: 'CREATE_WORKOUT', payload: json })
        }
    }

    useEffect(() => {
        async function fetchExercises(category) {


            const url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${category}?limit=10`;
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '6c86a21e4fmshf8eabebb7a4da3dp1a4e6bjsn8e8d7926a679',
                    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
                }
            };

            try {
                const response = await fetch(url, options);
                const result = await response.json();

                setExerciseList(result);
            } catch (error) {
                console.error(error);
            }

        }
        if (category) {
            fetchExercises(category)
        }
    }, [category])

    return (
        <div className="card mx-auto">
            <div className="card-body p-4 ">
                <form className="create" onSubmit={handleSubmit}>
                    <h3 className='text-secondary'>Add a New Workout</h3>

                    <FormControl fullWidth margin="normal">
                        <InputLabel id="input1">Body part</InputLabel>
                        <Select
                            labelId="input1"
                            label="Body part"
                            value={category}
                            onChange={e => setCategory(e.target.value)}>
                            <MenuItem value="" disabled>Body part</MenuItem>
                            <MenuItem value={'back'} >Back</MenuItem>
                            <MenuItem value={'cardio'} >Cardio</MenuItem>
                            <MenuItem value={'chest'} >Chest</MenuItem>
                            <MenuItem value={'lower arms'} >Lower arms</MenuItem>
                            <MenuItem value={'lower legs'} >Lower legs</MenuItem>
                            <MenuItem value={'neck'} >Neck</MenuItem>
                            <MenuItem value={'shoulders'} >Shoulders</MenuItem>
                            <MenuItem value={'upper arms'} >Upper arms</MenuItem>
                            <MenuItem value={'upper legs'} >Upper legs</MenuItem>
                            <MenuItem value={'waist'} >Waist</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="input2">Exercise name</InputLabel>
                        <Select
                            labelId="input2"
                            label="Exercise name"
                            value={exercise}
                            onChange={e => setExercise(e.target.value)}>
                            <MenuItem value="" disabled>Exercise</MenuItem>
                            {exerciseList && exerciseList.map((exercise) => (
                                <MenuItem key={exercise.id} value={exercise.id} >{exercise.name}</MenuItem>

                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <TextField
                            disabled={!exercise}
                            label="Load (in kg)"
                            type="number"
                            onChange={(e) => setLoad(e.target.value)}
                            value={load}
                            margin="normal"
                        /* className={emptyFields.includes('load') ? 'error' : ''} */ />
                    </FormControl>

                    <FormControl fullWidth>
                        <TextField
                            disabled={!exercise}
                            label="Reps"
                            type="number"
                            onChange={(e) => setReps(e.target.value)}
                            value={reps}
                            margin="normal"
                        /* className={emptyFields.includes('reps') ? 'error' : ''} */ />
                    </FormControl>

                    <label>Adicional Information:</label>
                    <textarea
                        disabled={!exercise}
                        onChange={(e) => setDescription(e.target.value)}
                        value={description} />
                    <div className='text-center mt-4'>
                        <button className='btn-outlined-secondary' disabled={!exercise}>Add Workout</button>
                    </div>

                    {error && <div className="error">{error}</div>}
                </form>
            </div>

        </div>

    )
}

export default WorkoutForm