import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Modal from 'react-modal';
import { UserContext } from '../context/UserProvider';
import { getUserByUsername, patchUser, deleteUser } from '../api/api';
import '../styles/profile.css';
import { LoadingSpinner } from './LoadingSpinner';

Modal.setAppElement('#root');

export const Profile = () => {
    const { user: currentUser, updateUser, logout } = useContext(UserContext);
    const { username } = useParams();
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState(null);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ name: '', avatar_url: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (username) {
            getUserByUsername(username)
            .then(({ data }) => {
                setUserDetails(data.user);
                setFormData({ name: data.user.name, avatar_url: data.user.avatar_url });
            })
            .catch((err) => {
                setError({msg:err.data.msg,status:err.status});
            });
        } else {
            setUserDetails(currentUser);
            setFormData({ name: currentUser.name, avatar_url: currentUser.avatar_url });
        }
    }, [username, currentUser]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const urlRegex = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1[1?\d{1,2}|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
        if (!urlRegex.test(formData.avatar_url)) {
            setError({msg:"Invalid URL",status:7});
            return;
        }
        patchUser({ username: currentUser.username, ...formData })
        .then(({ data }) => {
            setUserDetails(data.user);
            updateUser(data.user);
            setIsEditing(false);
            setError(null);
        })
        .catch((err) => {
            setError({msg:err.data.msg,status:err.status});
        });
    };

    const handleDeleteAccount = () => {
        deleteUser(currentUser.username)
        .then(() => {
            logout();
            navigate('/');
        })
        .catch((err) => {
            setError(err.data.msg);
        });
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="profile-container">
            {error && error.status === 404 ? 
            <>
                <p className="error-msg">{error.msg}</p> 
                <Link style={{textDecoration:'none', color:'#fff',}} to="/articles" className="back-button">Go Back to Home</Link>
            </>
            :
            !userDetails ? (
                <LoadingSpinner />
            ) : (
                <div className="profile-card">
                    <img src={userDetails.avatar_url} alt={`${userDetails.username}'s avatar`} className="profile-avatar" />
                    <h1 className="profile-username">{userDetails.username}</h1>
                    {isEditing ? (
                        <form onSubmit={handleFormSubmit} className="profile-form">
                            <label>
                                Name:
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="edit-input"
                                />
                            </label>
                            <label>
                                Avatar URL:
                                <input
                                    type="text"
                                    name="avatar_url"
                                    value={formData.avatar_url}
                                    onChange={handleInputChange}
                                    className="edit-input"
                                />
                            </label>
                            {error && error.status === 7 && <p className="error-msg-url">{error.msg}</p>}
                            <div className="profile-buttons">
                                <button type="submit" className="save-button">Save</button>
                                <button type="button" onClick={() => setIsEditing(false)} className="cancel-button">Cancel</button>
                            </div>
                        </form>
                    ) : (
                        <>
                            <h2 className="profile-name">{userDetails.name}</h2>
                            <div className="profile-buttons">
                                <button onClick={() => setIsEditing(true)} className="edit-button">Edit Profile</button>
                                <button onClick={openModal} className="delete-button">Delete Account</button>
                            </div>
                        </>
                    )}
                </div>
            )}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Confirm Account Deletion"
                className="modal"
                overlayClassName="overlay"
            >
                <h2>Confirm Account Deletion</h2>
                <p>Are you sure you want to delete your account? This action cannot be undone.</p>
                <div className="modal-buttons">
                    <button 
                        onClick={handleDeleteAccount} 
                        className="cancel-button" 
                        style={{backgroundColor:'#ff4d4d'}}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#cc0000'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#ff4d4d'}
                    >
                        Delete
                    </button>
                    <button 
                        onClick={closeModal} 
                        className="cancel-button" 
                        style={{backgroundColor:'#6c757d'}}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#4d5458'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#6c757d'}
                    >
                        Cancel
                    </button>
                </div>
            </Modal>
        </div>
    );
};
