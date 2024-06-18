import { useEffect, useState } from 'react';
import { getArticleById } from '../../api/api';
import { useParams } from 'react-router-dom';
import { ArticleBox } from './ArticleBox';
import '../../styles/article-by-id.css'

export const ArticleId = () => {
    const [article, setArticle] = useState([]);
    const {article_id} = useParams()
    useEffect(()=>{
        getArticleById(article_id)
        .then(({article})=>{
            setArticle(article)
        })
    },[article_id])
    return (
        <section className='article-comments'>
            <ArticleBox article={article}/>
        </section>
    )
}