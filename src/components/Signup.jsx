import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { postUser } from '../api/api';
import { LoadingSpinner } from './LoadingSpinner';
import '../styles/signup.css';

// eslint-disable-next-line react/prop-types
const Signup = ({ setAccountCreated }) => {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [usernameErrorMsg, setUsernameErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [avatarErrorMsg, setAvatarErrorMsg] = useState('');
    const navigate = useNavigate();

    const handleSignupSubmit = (event) => {
        setLoading(true);
        event.preventDefault();
        const urlRegex = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
        const isValid = urlRegex.test(avatarUrl);
        if (isValid === false) {
        setLoading(false);
        setAvatarErrorMsg('Invalid Avatar Url!');
        } else {
        setUsernameErrorMsg('');
        setAvatarErrorMsg('');
        postUser({ username, name, avatar_url:avatarUrl })
            .then(() => {
            setLoading(false);
            setAccountCreated(true);
            navigate('/login');
            })
            .catch((err) => {
            setLoading(false);
            setAccountCreated(false);
            setUsernameErrorMsg(err.data.msg);
            });
        }
    };

    return (
        <>
        {loading ? (
            <LoadingSpinner />
        ) : (
            <div className="form-container">
            <form className="signup-form" onSubmit={handleSignupSubmit}>
                <h1 className="form-heading">Sign Up</h1>
                <label className="form-label">Enter your username:
                <input
                    required
                    type="text"
                    name="username"
                    className="form-input"
                    value={username || ""}
                    onChange={(event) => setUsername(event.target.value)}
                />
                </label>
                {usernameErrorMsg && <p className="error-msg">{usernameErrorMsg}</p>}
                <p className="info-text">Length: 6-20 characters. Must have letters. Can have numbers and 2 symbols: dot(.) and hyphen(-). Cannot end with symbol.</p>
                <label className="form-label">Enter your name:
                <input
                    required
                    type="text"
                    name="name"
                    className="form-input"
                    value={name || ""}
                    onChange={(event) => setName(event.target.value)}
                />
                </label>
                <label className="form-label">Enter your image avatar:
                <input
                    required
                    type="text"
                    name="avatar_url"
                    className="form-input"
                    value={avatarUrl || ""}
                    onChange={(event) => setAvatarUrl(event.target.value)}
                />
                </label>
                {avatarErrorMsg && <p className="error-msg">{avatarErrorMsg}</p>}
                <button className="form-button" type="submit">Sign up</button>
            </form>
            <Link className="switch-form-link" to="/login">Already Have An Account? Click Here To Login!</Link>
            </div>
        )}
        </>
    );
};

export default Signup;




<p className="info-text">Length: 6-20 characters. Must have letters. Can have numbers and 2 symbols: dot(.) and hyphen(-). Cannot end with symbol.</p>
