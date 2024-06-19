import { useEffect, useState } from 'react';
import { getArticleById, getArticleComments } from '../../api/api';
import {  useParams } from 'react-router-dom';
import { ArticleBox } from './ArticleBox';
import '../../styles/article-by-id.css'
import { CommentsBox } from './Commment-Box';

export const ArticleId = () => {
    const [article, setArticle] = useState([]);
    const [articleComments, setArticleComments] = useState([]);
    const {article_id} = useParams()
    useEffect(()=>{
        getArticleById(article_id)
        .then(({article})=>{
            setArticle(article)
        })
        getArticleComments(article_id)
        .then((comments)=>{
            setArticleComments(comments)
        })
    },[article_id])
    return (
        <section className='article-comments'>
            <ArticleBox article={article}/>
            <hr></hr>
            <CommentsBox articleComments={articleComments} setArticleComments={setArticleComments} article={article}/>
        </section>
    )
}