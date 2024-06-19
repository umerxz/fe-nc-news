/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart, faHeartCrack } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import '../../styles/article-by-id.css'
import { patchArticle } from "../../api/api";

export const ArticleBox = ({article}) => {
    const [vote,setVote]=useState(0)

    useEffect(() => {
        setVote(article.votes)
    }, [article])

    if(!article){
        return(
            <h1>Loading...</h1>
        )
    }

    const handleDownVote = (article_id) => {
        setVote(vote=>vote-1)
        patchArticle(article_id,-1)
        .catch((err)=>setVote(vote=>vote+1))
    }

    const handleUpVote = (article_id) => {
        setVote(vote=>vote+1)
        patchArticle(article_id,1)
        .catch((err)=>setVote(vote=>vote-1))
    }    
    return (
        <>
            <div className="card">
                <div className="card-content">
                    <p className="articleTitle">
                    {article.title}
                    </p>
                    <p className="articleSubtitle">By: {article.author} </p>
                    <p className="articleSubtitle">At {new Date(article.created_at).toLocaleTimeString()} on {new Date(article.created_at).toLocaleDateString()} </p>
                    {!article.article_img_url ? <h1>LOADING IMAGE...</h1> : <img style={{ borderRadius: '10px'}} src={article.article_img_url} alt={`This image text is about ${article.title}`} /> }
                </div>
                <footer className="card-footer">
                    <p className="card-footer-item">
                        <span> <FontAwesomeIcon onClick={()=>handleDownVote(article.article_id)} icon={faHeartCrack} beat style={{ color: '#ff2e2e' }} /> </span>
                    </p>
                    <p className="card-footer-item">
                        <span> {vote} </span>
                    </p>
                    <p className="card-footer-item">
                        <span> <FontAwesomeIcon onClick={()=>handleUpVote(article.article_id)} icon={faHeart} beat style={{ color: '#ff2e2e' }} /> </span>
                    </p>
                </footer>
            </div>
        </>
    )
}