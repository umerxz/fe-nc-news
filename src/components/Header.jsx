import {  Link } from 'react-router-dom';
import '../styles/header.css'
import { useContext } from 'react';
import { UserContext } from '../context/UserProvider';

export const Header = () => {
    let {user} = useContext(UserContext)
    let {logout} = useContext(UserContext)

    return (
        <>
            <header className='header'>
                <h1>NC NEWS</h1>
                <details>
                    <summary>{user ? user.username : <Link style={{fontSize:20}} to="/login">Login</Link>}</summary>
                    <Link to='/login'>{user && <button onClick={logout}>Logout</button>}  </Link>
                </details>
            </header>
        </>
    )
}
