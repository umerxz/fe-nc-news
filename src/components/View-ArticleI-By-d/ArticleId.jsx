import { useEffect, useState } from 'react';
import { getArticleById, getArticleComments } from '../../api/api';
import {  useParams } from 'react-router-dom';
import { ArticleBox } from './ArticleBox';
import '../../styles/article-by-id.css'
import { CommentsBox } from './Commment-Box';

export const ArticleId = () => {
    const [article, setArticle] = useState([]);
    const [articleComments, aetArticleComments] = useState([]);
    const {article_id} = useParams()
    useEffect(()=>{
        getArticleById(article_id)
        .then(({article})=>{
            setArticle(article)
        })
        getArticleComments(article_id)
        .then((comments)=>{
            aetArticleComments(comments)
        })
    },[article_id])
    return (
        <section className='article-comments'>
            <ArticleBox article={article}/>
            <CommentsBox articleComments={articleComments} articleId={article_id}/>
        </section>
    )
}