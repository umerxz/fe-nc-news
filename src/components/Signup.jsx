import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { postUser } from '../api/api';

// eslint-disable-next-line react/prop-types
const Signup = ({setAccountCreated}) => {
    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [avatarUrl, setAvatarUrl] = useState('')
    const [usernameErrorMsg, setUsernameErrorMsg] = useState('')
    const [avatarErrorMsg, setAvatarErrorMsg] = useState('')
    const navigate = useNavigate();

    const handleSignupSubmit = (event) => {
        event.preventDefault()
        const urlRegex = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i
        const isValid = urlRegex.test(avatarUrl)
        if(isValid===false){
            setUsernameErrorMsg('')
            setAvatarErrorMsg('Invalid Avatar Url!')
        }
        else{
            setUsernameErrorMsg('')
            setAvatarErrorMsg('')
            postUser({ username, name, avatarUrl })
            .then(() => {
                setAccountCreated(true)
                navigate('/login') 
            })
            .catch((err) => {
                setAccountCreated(false)
                setUsernameErrorMsg(err.data.msg)
            })
        }
    }

    return (
        <div className='formbox'>
            <form onSubmit={handleSignupSubmit}>
                <h1 className='formHeading'>SignUp</h1>
                <label>Enter your username:
                    <input
                        required
                        type="text"
                        name="username"
                        value={username || ""}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </label>
                {usernameErrorMsg?<p style={{color:'red'}}>{usernameErrorMsg}</p>:null}
                <p>Length: 6-20. Must have letters. Can have 2 symbols - . numbers. Cannot end with symbol </p>
                <label>Enter your name:
                    <input
                        required
                        type="text"
                        name="name"
                        value={name || ""}
                        onChange={(event) => setName(event.target.value)}
                    />
                </label>
                <br></br>
                <label>Enter your image avatar:
                    <input
                        required
                        type="text"
                        name="avatar_url"
                        value={avatarUrl || ""}
                        onChange={(event) => setAvatarUrl(event.target.value)}
                    />
                </label>
                {avatarErrorMsg?<p style={{color:'red'}}>{avatarErrorMsg}</p>:null}
                <button className='btns' type='submit'>Sign up</button>
            </form>
            <Link style={{textAlign:'center',color:'lightgrey'}} to='/login'><p className='switchForm'>Don&apos;t Have An Account? Click Here To SignUp!</p></Link>
        </div>
    );
};

export default Signup;
