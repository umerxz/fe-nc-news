/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart, faHeartCrack } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import '../../styles/article-by-id.css'

export const ArticleBox = ({article}) => {
    // eslint-disable-next-line no-unused-vars
    const [vote,setVote]=useState(article.votes)

    useEffect(() => {
    }, [article])

    if(!article){
        return(
            <h1>Loading...</h1>
        )
    }

   
    return (
        <>
            <div className="card">
                <div className="card-content">
                    <p className="title">
                    {article.title}
                    </p>
                    <p className="subtitle">By: {article.author} at {article.created_at}</p>
                    {!article.article_img_url ? <h1>LOADING IMAGE...</h1> : <img style={{ borderRadius: '10px'}} src={article.article_img_url} alt={`This image text is about ${article.title}`} /> }
                </div>
                <footer className="card-footer">
                    <p className="card-footer-item">
                        <span> <FontAwesomeIcon icon={faHeartCrack} beat style={{ color: '#ff2e2e' }} /> </span>
                    </p>
                    <p className="card-footer-item">
                        <span> {vote} </span>
                    </p>
                    <p className="card-footer-item">
                        <span> <FontAwesomeIcon icon={faHeart} beat style={{ color: '#ff2e2e' }} /> </span>
                    </p>
                </footer>
            </div>
        </>
    )
}