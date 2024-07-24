import { useState, useContext } from 'react';
import { UserContext } from '../context/UserProvider';
import { Link, useNavigate } from 'react-router-dom';
import { LoadingSpinner } from './LoadingSpinner';
import '../styles/login.css';

// eslint-disable-next-line react/prop-types
const Login = ({ accountCreated }) => {
    const [username, setUsername] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const { loginUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLoginSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        setErrorMsg('');
        loginUser(username)
        .then(() => {
            setLoading(false);
            navigate('/articles');
        })
        .catch((err) => {
            setLoading(false);
            setErrorMsg(err.data.msg);
        });
    };

    return (
        <>
        {loading ? (
            <LoadingSpinner />
        ) : (
            <div className="form-container">
            <form className="login-form" onSubmit={handleLoginSubmit}>
                <h1 className="form-heading">Login</h1>
                {accountCreated && <p className="account-created-msg">Login to the Account just created</p>}
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
                {errorMsg && <p className="error-msg">{errorMsg}</p>}
                <button className="form-button" type="submit">Login</button>
            </form>
            <Link className="switch-form-link" to="/signup">Don&apos;t Have An Account? Click Here To Sign Up!</Link>
            </div>
        )}
        </>
    );
};

export default Login;
