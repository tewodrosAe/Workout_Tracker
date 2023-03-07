import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

function Navbar() {
  const {logout} = useLogout()
  const handleClick = () => {
    logout()
  }
  const { user } = useAuthContext()
  return (
    <header>
        <div className="container">
            <Link to='/'>
                <h1> Workout Buddy </h1>
            </Link>
            <nav>
              { user &&
              (<div>
                <div>{user.email}</div>
                <button onClick={handleClick}>Log out</button>
              </div>)
              }
              { !user &&
              <div>
                <Link to='/login'>Login</Link>
                <Link to='/signup'>Signup</Link>
              </div>
              }
            </nav>
        </div>
    </header>
  )
}

export default Navbar