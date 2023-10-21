import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'
import { Link } from 'react-router-dom'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

function Signup() {
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [birthday, setBirthday] = useState('')
    const [gender, setGender] = useState('')

    const { signup, error, isLoading } = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(first_name, last_name, email, password, birthday, gender )

    }

    return (
        <div className='pages container pt-5'>
            <div className='card mx-auto'>
                <div className="card-body p-4 ">
                    <div className='card-title text-center mb-3 '>
                        <h1 className='text-secondary'>Gym Bro</h1>
                        <h2 className='text-primary'>Workout tracker</h2>
                    </div>
                    <form onSubmit={handleSubmit} className="signup">
                        <h3 className='text-secondary'>Sign up</h3>
                        <div className="d-flex justify-content-between">
                            <TextField
                                                  
                                className="small-input"
                                margin="normal"
                                label="First Name"
                                type="text"
                                onChange={(e) => setFirstName(e.target.value)}
                                value={first_name} />
                            <TextField
                                className="small-input"
                                margin="normal"
                                label="Last Name"
                                type="text"
                                onChange={(e) => setLastName(e.target.value)}
                                value={last_name} />
                        </div>
                        <FormControl fullWidth>
                            <TextField
                             margin="normal"
                                label="E-mail"
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email} />
                        </FormControl>

                        <FormControl fullWidth>
                            <TextField
                             margin="normal"
                                label='Password'
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password} />
                       </FormControl>

                        <FormControl fullWidth margin="normal">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker label="Birthday"
                                    disableFuture
                                    value={birthday} onChange={(e) => setBirthday(e)} />
                            </LocalizationProvider>
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                            <Select
                            
                                labelId="demo-simple-select-label"
                                label="Gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <MenuItem value="" disabled>Gender</MenuItem>
                                <MenuItem value={'FEMALE'}>Female</MenuItem>
                                <MenuItem value={'MALE'}>Male</MenuItem>
                                <MenuItem value={'CUSTOM'}>Custom</MenuItem>
                            </Select>
                        </FormControl>

                        <small>By clicking Sign Up, you agree to our <Link to='/terms'>Terms</Link>.</small>
                        <div className='text-center mt-4'>
                            <button className='btn-outlined-secondary' disabled={isLoading}>Sign up</button>
                        </div>

                        {error && <div className='error'>{error}</div>}
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Signup