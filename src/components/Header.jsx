/* eslint-disable react/prop-types */
import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';
import Logo from '../Logo/NC-NEWS.png';
import '../styles/header.css';

export const Header = ({ onLogoClick }) => {
  const { user, logout } = useContext(UserContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-menu')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMenuItemClick = (setting) => {
    if (setting === 'Logout') {
      logout();
      navigate('/login');
    } else if (setting === 'Profile') {
      navigate(`/profile/${user.username}`);
    } else if (setting === 'My Articles') {
      navigate('/my-articles');
    }
    setIsDropdownOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="left-section">
          <Link to={user ? "/articles?topic=&sort_by=created_at&order=desc&limit=10&page=1" : "/"} className="title-link" onClick={onLogoClick}>
            <img src={Logo} alt="NC NEWS" className="logo" />
          </Link>
          <Link style={{ textDecoration: 'none', color: '#fff' }} className="nav-link" to="/about">About</Link>
        </div>
        <div className="right-section">
          {user ? (
            <div className="user-menu">
              <img
                src={user.avatar_url}
                alt={user.username}
                className="user-avatar"
                onClick={toggleDropdown}
              />
              {isDropdownOpen && (
                <div className="dropdown-content">
                  <Link className="dropdown-item" to={`/profile/${user.username}`} onClick={() => handleMenuItemClick('Profile')}>
                    {user.username}
                  </Link>
                  <Link className="dropdown-item" to="/my-articles" onClick={() => handleMenuItemClick('My Articles')}>
                    My Articles
                  </Link>
                  <div className="divider"></div>
                  <Link className="dropdown-item" onClick={() => handleMenuItemClick('Logout')} to='/login'>Logout</Link>
                </div>
              )}
            </div>
          ) : (
            <Link className="login-link" to="/login">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
}
