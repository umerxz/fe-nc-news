import {  Outlet } from 'react-router-dom';
import '../styles/header.css'
import { useContext } from 'react';
import { UserContext } from '../context/UserProvider';

export const Header = () => {
    let {user} = useContext(UserContext)
    if(!user){
        return <h1>Loading...</h1>
    }
    return (
        <>
            <header className='header'>
                <h1>NC NEWS</h1>
                <details>
                    <summary>{user.data.user.username}</summary>
                    <p>Logout</p>
                </details>
                
            </header>
            <Outlet />
        </>
    )
}
