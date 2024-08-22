import { useEffect, useState } from 'react';
import { getArticleById, getArticleComments } from '../../api/api';
import { useParams } from 'react-router-dom';
import { ArticleBox } from './ArticleBox';
import '../../styles/article-by-id.css';
import { CommentsBox } from './Commment-Box';
import { useContext } from 'react';
import { UserContext } from '../../context/UserProvider';
import { Link } from "react-router-dom";
import { LoadingSpinner } from '../LoadingSpinner';

export const ArticleId = () => {
    const [article, setArticle] = useState(null);
    const [articleComments, setArticleComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const { article_id } = useParams();
    const { user } = useContext(UserContext);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        setLoading(true);
        getArticleById(article_id)
            .then(({ article }) => {
                setArticle(article);
                setLoading(false);
            })
            .catch((err) => {
                setErrorMsg({ msg: err.data.msg, status: err.status });
                setLoading(false);
            });
        setLoading(true);
        getArticleComments(article_id)
            .then((comments) => {
                setLoading(false);
                setArticleComments(comments);
            })
            .catch((err) => {
                setErrorMsg({ msg: err.data.msg, status: err.status });
                setLoading(false);
            });
    }, [article_id]);

    if (!user) {
        return <h1 style={{ fontSize: '5rem' }}>Please <Link to='/login' style={{ fontSize: '5rem', textDecoration: 'underline' }}> Login</Link> to gain access to NC News</h1>;
    }

    if (errorMsg) {
        return (
            <div className="error-container">
                <div className="error-message">
                    <h2>Error {errorMsg.status}: {errorMsg.msg}</h2>
                </div>
            </div>
        );
    }

    if (loading || !article) {
        return <LoadingSpinner />;
    }

    return (
        <>
            <div className="descriptive-text-container">
                <p className="descriptive-text">Welcome to the Article Details Page! Here, you&apos;ll find in-depth insights and engaging discussions about {article.topic.toUpperCase()}</p>
            </div>
            <div className="article-comments-container">
                <ArticleBox article={article} />
                <CommentsBox articleComments={articleComments} setArticleComments={setArticleComments} article={article} />
            </div>
        </>
    );
};
