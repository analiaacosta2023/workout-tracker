import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

function Navbar() {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }

    return (
        <header className='bg-background'>
            <div className='container navbar'>
                <div className='container-fluid'>
                    <Link className='navbar-brand d-inline-flex align-items-center' to='/'>
                        <img className="site-logo" src="../../img/GB.jpg" alt="" />
                        <h1 className='text-secondary'>Gym Bro</h1>
                    </Link>
                    <nav className='nav justify-content-end'>
                        {user && (
                            <div>
                                <span>{user.first_name} {user.last_name}</span>
                                <button className='btn-outlined-primary  ms-3' onClick={handleClick}>Log out</button>
                            </div>
                        )}
                        {!user && (
                            <div>
                                <Link className='btn-outlined-primary' to='/login'>Login</Link>
                                <Link className='btn-outlined-primary ms-3' to='/signup'>Signup</Link>
                            </div>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Navbar