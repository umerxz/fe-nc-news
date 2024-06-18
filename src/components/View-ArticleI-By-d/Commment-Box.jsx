/* eslint-disable react/prop-types */
import { useState } from 'react';
import '../../styles/post-id.css'
import { Comments } from './Comments';

export const CommentsBox = ({articleComments}) => {
    const [isViewAllComments,setIsViewAllComments,]=useState(false)
    const handleViewAllComments = () => {
        setIsViewAllComments(!isViewAllComments)
    }
    return (
        <>
        
            { isViewAllComments ? 
                <>
                    <p className="view-hide-comments" onClick={handleViewAllComments}>Hide All Comments</p>
                    <a id="View_All_Comments"><Comments className='remove-pointer' articleComments={articleComments} /> </a> 
                </> :
                <a href="#View_All_Comments"> <p onClick={handleViewAllComments}> View All Comments... </p> </a>
            }
        </>
    )
}