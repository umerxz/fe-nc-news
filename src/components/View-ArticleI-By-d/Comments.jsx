/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Typography } from '@mui/material';
import { faTrash, faPenToSquare, faHeartCrack, faHeart } from '@fortawesome/free-solid-svg-icons';
import '../../styles/post-id.css';
import { deleteComment, updateComment } from '../../api/api';
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../context/UserProvider';
import { LoadingSpinner } from '../LoadingSpinner';

export const Comments = ({ articleComments, setArticleComments, article }) => {
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(null); 
    const [editContent, setEditContent] = useState('');
    const [errorMsg, setErrorMsg] = useState(null); 
    let { user } = useContext(UserContext);

    const handleDeleteComment = (comment) => {
        const commentId = comment.comment_id;
        setLoading(true);
        deleteComment(commentId)
            .then(() => {
                setArticleComments(articleComments => articleComments.filter(comment => comment.comment_id !== commentId));
                setLoading(false);
            })
            .catch((err) => {
                setErrorMsg({ msg: 'Failed to delete comment', status: err.status });
                setLoading(false);
            });
    };

    const handleEditComment = (comment) => {
        setEditMode(comment.comment_id);
        setEditContent(comment.body);
    };

    const handleSaveEdit = (commentId) => {
        setLoading(true);
        updateComment(commentId, { body: editContent })
            .then(() => {
                setArticleComments(articleComments =>
                    articleComments.map(comment =>
                        comment.comment_id === commentId ? { ...comment, body: editContent } : comment
                    )
                );
                setEditMode(null);
                setLoading(false);
            })
            .catch((err) => {
                setErrorMsg({ msg: 'Failed to edit comment', status: err.status });
                setLoading(false);
            });
    };

    const handleCancelEdit = () => {
        setEditMode(null);
        setEditContent('');
    };

    const handleVote = (commentId, newVote) => {
        setLoading(true);
        updateComment(commentId, { newVote })
            .then(() => {
                setArticleComments(articleComments =>
                    articleComments.map(comment =>
                        comment.comment_id === commentId ? { ...comment, votes: comment.votes + newVote } : comment
                    )
                );
                setLoading(false);
            })
            .catch((err) => {
                setErrorMsg({ msg: 'Failed to vote on comment', status: err.status });
                setLoading(false);
            });
    };

    return (
        <section className='comments'>
            {
                loading ? <LoadingSpinner /> : (
                    <>
                        <h3 className='commentsText'>Comments</h3>
                        {errorMsg && (
                            <div className="error-container">
                                <div className="error-message">
                                    <h2>Error {errorMsg.status}: {errorMsg.msg}</h2>
                                </div>
                            </div>
                        )}
                        {articleComments.length === 0 ? (
                            <div className="no-comments-container">
                                <Typography variant="h6" component="div" className="no-comments-message">
                                    No comments yet. <span className="be-first">Be the first to comment!</span>
                                </Typography>
                            </div>
                        ) : (
                            articleComments.map((comment, index) => (
                                <Card className='individualCommentBox' key={comment.comment_id ? comment.comment_id : index}
                                    variant="outlined"
                                    sx={{ borderRadius: 4, '--Card-radius': 0 }}
                                >
                                    <CardContent orientation="horizontal">
                                        <Avatar src="https://via.placeholder.com/44" alt="Avatar image" />
                                        <div style={{ textAlign: 'left', fontSize: '12px' }}>
                                            <Typography style={{ textAlign: 'left', fontSize: '15px' }} variant="text">{comment.author}</Typography>
                                            <Typography style={{ textAlign: 'left', fontSize: '10px' }} level="body-sm">At {new Date(comment.created_at).toLocaleTimeString()} on {new Date(comment.created_at).toLocaleDateString()}</Typography>
                                        </div>
                                    </CardContent>
                                    <CardContent>
                                        {editMode === comment.comment_id ? (
                                            <div className="edit-comment-container">
                                                <textarea
                                                    className="edit-comment-textarea"
                                                    value={editContent}
                                                    onChange={(e) => setEditContent(e.target.value)}
                                                />
                                                <div className="edit-comment-buttons">
                                                    <button className="save-edit-button" onClick={() => handleSaveEdit(comment.comment_id)}>Edit</button>
                                                    <button className="cancel-edit-button" onClick={handleCancelEdit}>Cancel</button>
                                                </div>
                                            </div>
                                        ) : (
                                            <Typography style={{ textAlign: 'left', marginBottom: 0, paddingBottom: 0 }} variant="body2">
                                                {comment.body}
                                            </Typography>
                                        )}
                                        <div className='commentIcons'>
                                            <div className='likeDislike'>
                                                <FontAwesomeIcon
                                                    className='like'
                                                    icon={faHeartCrack}
                                                    style={{ color: '#ff2e2e' }}
                                                    size="2xs"
                                                    onClick={() => handleVote(comment.comment_id, -1)}
                                                />
                                                <span style={{ fontSize: '13px' }}> {comment.votes} </span>
                                                <FontAwesomeIcon
                                                    className='dislike'
                                                    icon={faHeart}
                                                    style={{ color: '#ff2e2e' }}
                                                    size="2xs"
                                                    onClick={() => handleVote(comment.comment_id, 1)}
                                                />
                                            </div>
                                            {(comment.author === user.username || article.author === user.username) && (
                                                <div className='editDelete'>
                                                    {comment.author === user.username && (
                                                        <FontAwesomeIcon
                                                            className='editAllow'
                                                            icon={faPenToSquare}
                                                            size="2xs"
                                                            onClick={() => handleEditComment(comment)}
                                                        />
                                                    )}
                                                    <FontAwesomeIcon
                                                        className='trashAllow'
                                                        onClick={() => handleDeleteComment(comment)}
                                                        icon={faTrash}
                                                        size="2xs"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </>
                )
            }
        </section>
    );
};
