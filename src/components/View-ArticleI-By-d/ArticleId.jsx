import { useEffect, useState } from 'react';
import { getArticleById, getArticleComments } from '../../api/api';
import {  useParams } from 'react-router-dom';
import { ArticleBox } from './ArticleBox';
import '../../styles/article-by-id.css'
import { CommentsBox } from './Commment-Box';
import { useContext } from 'react';
import { UserContext } from '../../context/UserProvider';
import { Link } from "react-router-dom";
import { LoadingSpinner } from '../LoadingSpinner';

export const ArticleId = () => {
    const [article, setArticle] = useState([]);
    const [articleComments, setArticleComments] = useState([]);
    const [loading,setLoading] = useState(false)
    const {article_id} = useParams()
    let {user} = useContext(UserContext)

    useEffect(()=>{
        setLoading(true)
        getArticleById(article_id)
        .then(({article})=>{
            setArticle(article)
            setLoading(false)
        })
        setLoading(true)
        getArticleComments(article_id)
        .then((comments)=>{
            setLoading(false)
            setArticleComments(comments)
        })
    },[article_id])

    if(!user){
        return <h1 style={{fontSize:'5rem'}}>Please <Link to='/login' style={{fontSize:'5rem',textDecoration:'underline'}}> Login</Link> to gain access to NC News</h1>
    }
    return (
        <section className='article-comments'>
            {
                loading
                ?
                <LoadingSpinner/>
                :
                <>
                    <ArticleBox article={article}/>
                    <hr></hr>
                    <CommentsBox articleComments={articleComments} setArticleComments={setArticleComments} article={article}/>
                </>
            }
        </section>
    )
}