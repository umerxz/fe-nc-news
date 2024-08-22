/* eslint-disable react/prop-types */
import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { UserContext } from '../../context/UserProvider';
import { getAllArticles, getTopics, createArticle, createTopic } from '../../api/api';
import { ArticlesCards } from './ArticlesCards';
import { LoadingSpinner } from '../LoadingSpinner';
import { Navbar } from './Navbar';
import Pagination from './Pagination';
import ArticlesPerPage from './ArticlesPerPage';
import Modal from 'react-modal';
import '../../styles/all-articles.css';
import { Header } from '../Header';
import '../../styles/header.css';

Modal.setAppElement('#root');

export const ArticlesPage = ({ author, customTitle, customMessage }) => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [articlesList, setArticlesList] = useState([]);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(true); 
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [topics, setTopics] = useState([]);
    const [newArticle, setNewArticle] = useState({ title: '', body: '', topic: '', newTopic: '', description: '', article_img_url: '' });
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(parseInt(searchParams.get('page') || 1));
    const [limit, setLimit] = useState(parseInt(searchParams.get('limit') || 10));
    const [totalCount, setTotalCount] = useState(0);
    const [params, setParams] = useState({
        topic: searchParams.get('topic') || '',
        sort_by: searchParams.get('sort_by') || 'created_at',
        order: searchParams.get('order') || 'desc',
        limit: parseInt(searchParams.get('limit')) || 10,
        page: parseInt(searchParams.get('page')) || 1
    });
    const [resetFilters, setResetFilters] = useState(false);

    useEffect(() => {
        const savedParams = JSON.parse(localStorage.getItem('appliedParams')) || params;
        setParams(savedParams);
        fetchTopics().then(() => fetchArticles(savedParams));
    }, []);

    useEffect(() => {
        const newParams = { ...params, limit, page };
        setParams(newParams);
        if (!errorMsg) {
            fetchArticles(newParams);
        }
    }, [limit, page]);

    const fetchTopics = () => {
        return getTopics()
            .then(({ topics }) => {
                setTopics(topics);
            })
            .catch((err) => {
                setErrorMsg({ status: err.status, msg: err.data.msg });
                setLoading(false);
            });
    };

    const fetchArticles = (params) => {
        if (author) {
            params.author = author;
        }
        setLoading(true); 
        getAllArticles(params)
            .then(({ articles, total_count }) => {
                if (articles.length === 0) {
                    setErrorMsg({ status: 404, msg: 'No articles found for the selected topic.' });
                    setArticlesList([]);
                    setTotalCount(0);
                } else {
                    setArticlesList(articles);
                    setTotalCount(total_count);
                    setErrorMsg(null); 
                }
            })
            .catch((err) => {
                setArticlesList([]); 
                setTotalCount(0);
                setErrorMsg({ status: err.status, msg: err.data.msg });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setNewArticle({ title: '', body: '', topic: '', newTopic: '', description: '', article_img_url: '' });
        setErrorMsg(null);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewArticle({ ...newArticle, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMsg(null);

        const urlRegex = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1[1?\d{1,2}|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z\u00a1-\uffff_-]{0,62})?[a-z\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
        if (newArticle.article_img_url !== '' && !urlRegex.test(newArticle.article_img_url)) {
            setErrorMsg({ for: 'image', status: null, msg: 'Invalid Image URL' });
            return;
        }

        if (newArticle.topic === 'new') {
            try {
                await createTopic({ slug: newArticle.newTopic, description: newArticle.description });
                await fetchTopics(); 
            } catch (error) {
                setErrorMsg({ for: 'topic', status: error.status, msg: error.data.msg });
                return;
            }
        }

        const articleData = {
            title: newArticle.title,
            body: newArticle.body,
            topic: newArticle.newTopic || newArticle.topic,
            author: user.username,
            article_img_url: newArticle.article_img_url
        };

        createArticle(articleData)
            .then(() => {
                setModalIsOpen(false);
                fetchArticles(params);
            })
            .catch((error) => {
                setErrorMsg({ for: 'article', status: error.status, msg: error.data.msg });
            });
    };

    const startArticle = (page - 1) * limit + 1;
    const endArticle = Math.min(page * limit, totalCount);

   

    if (!user) {
        return <h1 style={{ fontSize: '2rem' }}>Please <Link to='/login' style={{ fontSize: '2rem', textDecoration: 'underline' }}>Login</Link> to gain access to NC News</h1>;
    }

    return (
        <div className="all-articles-container">
            {/* <Header onLogoClick={handleLogoClick} /> */}
            {errorMsg ? (
                <div className="error-display">
                    <h2>Error {errorMsg.status}: {errorMsg.msg}</h2>
                </div>
            ) : (
                <>
                    {loading && <LoadingSpinner />}
                    {!loading && totalCount > 0 && (
                        <>
                            <Navbar 
                                setParams={(newParams) => { 
                                    setParams({ ...newParams, limit, page: 1 });
                                    fetchArticles({ ...newParams, limit, page: 1 });
                                    setPage(1);
                                    setLimit(limit);
                                }} 
                                topics={topics} 
                                resetFilters={resetFilters}
                                setResetFilters={setResetFilters}
                                limit={limit}
                                page={page}
                                setLimit={setLimit}
                                setPage={setPage}
                                setSearchParams={setSearchParams}
                            />
                            <div className="articles-content">
                                <div className="header-section">
                                    <div className="left-text">
                                        <p>{customTitle}</p>
                                    </div>
                                    <div className="separator">
                                        <div className="line"></div>
                                        <span>OR</span>
                                        <div className="line"></div>
                                    </div>
                                    <div className="right-text">
                                        <p>Contribute to the community by creating a new article</p>
                                        <button onClick={openModal} className="create-article-button">Create New Article</button>
                                    </div>
                                </div>
                                <div className="articles-per-page-container">
                                    <ArticlesPerPage
                                        limit={limit}
                                        setLimit={setLimit}
                                        totalCount={totalCount}
                                        setSearchParams={setSearchParams}
                                    />
                                    <span>Showing articles {startArticle} - {endArticle} of {totalCount} total articles</span>
                                </div>
                                <ArticlesCards articlesList={articlesList} />
                                <Pagination
                                    limit={limit}
                                    totalCount={totalCount}
                                    page={page}
                                    setPage={(newPage) => {
                                        setPage(newPage);
                                        fetchArticles({ ...params, page: newPage });
                                    }}
                                />
                            </div>
                        </>
                    )}
                    {!loading && totalCount === 0 && (
                        <div className="no-articles">
                            <p>{customMessage}</p>
                            <button onClick={openModal} className="create-article-button">Create New Article</button>
                        </div>
                    )}
                </>
            )}
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="ReactModal__Content" overlayClassName="ReactModal__Overlay">
                <h2>Create New Article</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Title:
                        <input type="text" name="title" value={newArticle.title} onChange={handleInputChange} required />
                        {errorMsg && errorMsg.for === 'article' && errorMsg.status === 'title' && <p className="error-msg">{errorMsg.msg}</p>}
                    </label>
                    <label>
                        Body:
                        <textarea name="body" value={newArticle.body} onChange={handleInputChange} required />
                        {errorMsg && errorMsg.for === 'article' && errorMsg.status === 'body' && <p className="error-msg">{errorMsg.msg}</p>}
                    </label>
                    <label>
                        Topic:
                        <select name="topic" value={newArticle.topic} onChange={handleInputChange} required >
                            <option value="">Select a topic</option>
                            {topics.map((topic) => (
                                <option key={topic.slug} value={topic.slug}>{topic.slug}</option>
                            ))}
                            <option value="new">Add New Topic</option>
                        </select>
                    </label>
                    {newArticle.topic === 'new' ? (
                        <>
                            <label>
                                New Topic:
                                <input type="text" name="newTopic" value={newArticle.newTopic} onChange={handleInputChange} />
                                {errorMsg && errorMsg.for === 'topic' && errorMsg.status === 403 && newArticle.newTopic !== '' && <p className="error-msg">{errorMsg.msg}</p>}
                                {errorMsg && errorMsg.for === 'topic' && errorMsg.status === 400 && newArticle.newTopic === '' && <p className="error-msg">{errorMsg.msg}</p>}
                            </label>
                            <label>
                                Description:
                                <textarea name="description" value={newArticle.description} onChange={handleInputChange} />
                            </label>
                        </>
                    ) : newArticle.newTopic = ''}
                    <label>
                        Image URL:
                        <input type="text" name="article_img_url" value={newArticle.article_img_url} onChange={handleInputChange} />
                        {errorMsg && errorMsg.for === 'image' && errorMsg.status === null && <p className="error-msg">{errorMsg.msg}</p>}
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </Modal>
        </div>
    );
};
