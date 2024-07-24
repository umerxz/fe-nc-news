import { useEffect, useState, useContext } from "react";
import { getAllArticles } from "../../api/api";
import { ArticlesCards } from "./ArticlesCards";
import { Navbar } from "./Navbar";
import { UserContext } from '../../context/UserProvider';
import { Link } from "react-router-dom";
import { LoadingSpinner } from "../LoadingSpinner";
import '../../styles/all-articles.css';

export const AllArticles = () => {
    const [articlesList, setArticlesList] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const [params, setParams] = useState({});
    const [loading, setLoading] = useState(false);
    const { user } = useContext(UserContext);
    
    useEffect(() => {
        setLoading(true);
        getAllArticles(params)
        .then(({ articles }) => {
            setArticlesList(articles);
            setErrorMsg('');
            setLoading(false);
        })
        .catch((err) => {
            setLoading(false);
            setErrorMsg(err.msg);
        });
    }, [params]);

    if (!user) {
        return <h1 style={{ fontSize: '2rem' }}>Please <Link to='/login' style={{ fontSize: '2rem', textDecoration: 'underline' }}>Login</Link> to gain access to NC News</h1>;
    }

    return (
        <div className="all-articles-container">
            <Navbar setParams={setParams} />
            <div className="articles-content">
                <h2 className="page-description">Explore the latest articles and updates on various topics. Filter, sort, and read articles of your interest.</h2>
                {
                    loading
                    ? <LoadingSpinner />
                    : errorMsg ? <h2>Error: {errorMsg}</h2> : <ArticlesCards articlesList={articlesList} />
                }
            </div>
        </div>
    );
}
