import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';
import '../styles/header.css';

export const Header = () => {
  const { user, logout } = useContext(UserContext);

  const toggleDropdown = () => {
    document.getElementById("myDropdown").classList.toggle("show");
  };

  const closeDropdown = (event) => {
    if (!event.target.closest('.user-menu')) {
      document.getElementById("myDropdown").classList.remove("show");
    }
  };

  useEffect(() => {
    document.addEventListener('click', closeDropdown);
    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, []);

  return (
    <header className="header">
      <div className="header-container">
        <Link to={user ? "/articles" : "/"} className="title-link">
          <h1>NC NEWS</h1>
        </Link>
        <nav>
          <Link className="nav-link" to="/about">About</Link>
          {user ? (
            <div className="user-menu">
              <img
                src={user.avatar_url}
                alt={user.username}
                className="user-avatar"
                onClick={toggleDropdown}
              />
              <div id="myDropdown" className="dropdown-content">
                <Link className="dropdown-item username" to={`/profile/${user.username}`}>{user.username}</Link>
                <div className="divider"></div>
                <Link className="dropdown-item" onClick={logout} to='/login'>Logout</Link>
              </div>
            </div>
          ) : (
            <Link className="login-link" to="/login">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
};
