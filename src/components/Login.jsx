import { useState, useContext } from 'react'
import { UserContext } from '../context/UserProvider'
import { Link, useNavigate } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const Login = ({accountCreated}) => {
    const [username, setUsername] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const { loginUser } = useContext(UserContext)
    const navigate = useNavigate()

    const handleLoginSubmit = (event) => {
        event.preventDefault()
        setErrorMsg('')
        loginUser(username)
        .then(() => {
            navigate('/articles')
        })
        .catch((err) => {
            setErrorMsg(err.data.msg)
        })
    }

    return (
        <div className='formbox'>
            <form onSubmit={handleLoginSubmit}>
                <h1 className='formHeading'>Login</h1>
                {accountCreated? <p>Login to the Account just created</p> :null}
                <label>Enter your username:
                    <input
                        required
                        type="text"
                        name="username"
                        value={username || ""}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </label>
                <br></br>
                <p style={{color:'red'}}>{errorMsg?errorMsg:null}</p>
                <button className='btns' type='submit'>Login</button>
            </form>
            <Link style={{textAlign:'center',color:'lightgrey'}} to='/signup'><p className='switchForm'>Don&apos;t Have An Account? Click Here To SignUp!</p></Link>

        </div>
    );
};

export default Login;