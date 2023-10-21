import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import { Link } from 'react-router-dom'

import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl';

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, error, isLoading } = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)

  }


  return (
    <div className='pages container pt-5'>
      <div className='card mx-auto'>


        <div className="card-body p-4 ">
          <div className='card-title text-center mb-3 '>
            <h1 className='text-secondary'>Gym Bro</h1>
            <h2 className='text-primary'>Workout tracker</h2>
          </div>
          <form onSubmit={handleSubmit} className="login">

            <h3 className='text-secondary'>Log in</h3>
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

            <div className="form-check  mb-4 p-0">
              <input className="form-check-input m-0" type="checkbox" id="defaultCheck13" />
              <label htmlFor="defaultCheck13" className="grey-text ms-1">Remember me
              </label>
            </div>

            <div className='text-center'>
              <button className='btn-outlined-secondary' disabled={isLoading}>Log in</button>
              <Link to='/resetpassword' className='ms-3'>Forgot password?</Link>
            </div>

            {error && <div className='error'>{error}</div>}
          </form>
        </div>

      </div>
    </div>


  )
}

export default Login