/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Typography } from '@mui/material';
import { faTrash,faPenToSquare,faHeartCrack,faHeart } from '@fortawesome/free-solid-svg-icons';
import '../../styles/post-id.css'
import { deleteComment } from '../../api/api';
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../context/UserProvider';

export const Comments = ({articleComments,setArticleComments,article}) => {
    const [errorMsg,setErrorMsg] = useState('')
    let {user} = useContext(UserContext)
    if(!user) return <h1>Loading...</h1>
    user = user.data.user

    const handleDeleteComment = (comment) => {
        const commentId = comment.comment_id
        deleteComment(commentId)
        .then(()=>{
            setArticleComments(articleComments=>articleComments.filter(comment=>comment.comment_id!==commentId))
            setErrorMsg('')
        })
        .catch((err)=>{
            setErrorMsg(err.msg)
        })
    }
    return (
        <section className='comments'>
            <h3 className='commentsText'>Comments</h3>
            {articleComments.map((comment,index) => (
                <Card className='individualCommentBox' key={comment.comment_id ? comment.comment_id : index}
                variant="outlined"
                sx={{  borderRadius: 4, '--Card-radius': 0 }}
                >
                    <CardContent orientation="horizontal">
                        <Avatar src="https://via.placeholder.com/44" alt="Avatar image" />
                        <div style={{textAlign:'left', fontSize:'12px'}}>
                        <Typography style={{textAlign:'left', fontSize:'15px'}} variant="text" >{comment.author}</Typography>
                        <Typography style={{textAlign:'left', fontSize:'10px'}} level="body-sm" >At {new Date(comment.created_at).toLocaleTimeString()} on {new Date(comment.created_at).toLocaleDateString()}</Typography>
                        </div>
                    </CardContent>
                    <CardContent >
                        <Typography style={{textAlign:'left',marginBottom:0,paddingBottom:0}} variant="body2">{comment.body}</Typography>
                        <div className='commentIcons'>
                            <div className='likeDislike'>
                                <FontAwesomeIcon className='like' icon={faHeartCrack} style={{ color: '#ff2e2e' }} size="2xs" />
                                <span style={{fontSize:'13px'}}> {comment.votes} </span>
                                <FontAwesomeIcon className='dislike' icon={faHeart} style={{ color: '#ff2e2e' }} size="2xs" />
                            </div>
                                <div className='editDelete'>
                                    <FontAwesomeIcon 
                                        className= {comment.author===user.username || article.author===user.username ? 'trashAllow' : 'trashDisallow'}
                                        onClick={comment.author===user.username || article.author===user.username ? ()=>handleDeleteComment(comment) : null} 
                                        icon={faTrash} size="2xs"
                                    />
                                    <FontAwesomeIcon
                                        className= {comment.author===user.username || article.author===user.username ? 'editAllow' : 'editDisallow'}
                                        icon={faPenToSquare} size="2xs" 
                                    />
                                </div>
                        </div>
                        {errorMsg ? <p>{errorMsg}</p> : null}
                    </CardContent>
                </Card>
            ))}
        </section>
    )
}