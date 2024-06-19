/* eslint-disable react/prop-types */
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import '../../styles/post-id.css'
import { Comments } from './Comments';
import { CommentAdder } from './CommentAdder';

export const CommentsBox = ({articleComments,setArticleComments,article}) => {
    const [isViewAllComments,setIsViewAllComments]=useState(false)
    const [showCommentFrom,setShowCommentForm] = useState(false)
    
    const handleViewAllComments = () => {
        setIsViewAllComments(!isViewAllComments)
    }

    const toggleCommentForm = () => {
        setShowCommentForm(!showCommentFrom)
    }

    return (
        <>
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button onClick={handleViewAllComments}>
                        {isViewAllComments ? 'Hide comments' : 'View comments'}
                    </button>
                    <span style={{ cursor: 'pointer', color: 'grey', }} >
                        <FontAwesomeIcon className='addCommentIcone' onClick={toggleCommentForm} icon={faSquarePlus} style={{ marginRight: '5px' }} />
                    </span>
                </div>
                {showCommentFrom ? <CommentAdder setArticleComments={setArticleComments} article_id={article.article_id} setIsViewAllComments={setIsViewAllComments}/> : null}
                {isViewAllComments 
                    && (
                    <Comments className='remove-pointer' 
                        articleComments={articleComments} 
                        setArticleComments={setArticleComments} 
                        article={article}
                    />
                )}
            </div>
        </>
    )
}