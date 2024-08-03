import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserProvider';
import { getAllArticles } from '../api/api';
import { ArticlesCards } from './View-All-Articles/ArticlesCards';
import { LoadingSpinner } from './LoadingSpinner';
import '../styles/my-articles.css';

export const MyArticles = () => {
    const { user } = useContext(UserContext);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) {
            getAllArticles({ author: user.username })
            .then(({ articles }) => {
                setArticles(articles);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err)
                setError({msg:err.data.msg});
                setLoading(false);
            });
        }
    }, [user]);

    if (loading) return <LoadingSpinner />;

    return (
        <div className="my-articles-container">
            <h2>My Articles</h2>
            {error?.msg === "User has no Articles!" ? (
                <div className="no-articles">
                    <p>You have not posted any Articles yet!</p>
                    <p>Let&apos;s head to the Articles Page and create one?</p>
                </div>
            ) : (
                <ArticlesCards articlesList={articles} />
            )}
        </div>
    );
};
