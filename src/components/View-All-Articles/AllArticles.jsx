import { useEffect, useState, useContext } from "react";
import { getAllArticles, getTopics, createArticle, createTopic } from "../../api/api";
import { ArticlesCards } from "./ArticlesCards";
import { Navbar } from "./Navbar";
import { UserContext } from '../../context/UserProvider';
import { Link } from "react-router-dom";
import { LoadingSpinner } from "../LoadingSpinner";
import Modal from 'react-modal';
import '../../styles/all-articles.css';

Modal.setAppElement('#root');

export const AllArticles = () => {
    const [articlesList, setArticlesList] = useState([]);
    const [errorMsg, setErrorMsg] = useState(null);
    const [params, setParams] = useState({});
    const [loading, setLoading] = useState(false);
    const { user } = useContext(UserContext);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [topics, setTopics] = useState([]);
    const [newArticle, setNewArticle] = useState({ title: '', body: '', topic: '', newTopic: '', description: '', article_img_url: '' });

    useEffect(() => {
        setLoading(true);
        getAllArticles(params)
        .then(({ articles }) => {
            setArticlesList(articles);
            setErrorMsg(null);
            setLoading(false);
        })
        .catch((err) => {
            setLoading(false);
            setErrorMsg({ msg: err.msg });
        });

        getTopics()
        .then(({ topics }) => {
            setTopics(topics);
        })
        .catch((err) => {
            setErrorMsg({ msg: err.msg });
        });
    }, [params]);

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

        const urlRegex = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1[1?\d{1,2}|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
        if (newArticle.article_img_url!=='' && !urlRegex.test(newArticle.article_img_url)) {
            setErrorMsg({ for: 'image', status: null, msg: 'Invalid Image URL' });
            return;
        }

        if (newArticle.topic === 'new') {
            try {
                await createTopic({ slug: newArticle.newTopic, description: newArticle.description });
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
            getAllArticles(params)
            .then(({ articles }) => {
                setArticlesList(articles);
            });
        })
        .catch((error) => {
            setErrorMsg({ for: 'article', status: error.status, msg: error.data.msg });
        });
    };

    if (!user) {
        return <h1 style={{ fontSize: '2rem' }}>Please <Link to='/login' style={{ fontSize: '2rem', textDecoration: 'underline' }}>Login</Link> to gain access to NC News</h1>;
    }

    return (
        <div className="all-articles-container">
            <Navbar setParams={setParams} topics={topics} />
            <div className="articles-content">
                <div className="header-section">
                    <div className="left-text">
                        <p>Explore the latest articles and updates on various topics. Filter, sort, and read articles of your interest.</p>
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
                {
                    loading
                    ? <LoadingSpinner />
                    : <ArticlesCards articlesList={articlesList} />
                }
            </div>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="ReactModal__Content" overlayClassName="ReactModal__Overlay">
                <h2>Create New Article</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Title:
                        <input type="text" name="title" value={newArticle.title} onChange={handleInputChange} required />
                        {errorMsg && errorMsg.for === 'article' && errorMsg.status==='title' && <p className="error-msg">{errorMsg.msg}</p>}
                    </label>
                    <label>
                        Body:
                        <textarea name="body" value={newArticle.body} onChange={handleInputChange} required />
                        {errorMsg && errorMsg.for === 'article' && errorMsg.status==='body' && <p className="error-msg">{errorMsg.msg}</p>}
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
                                <input type="text" name="newTopic" value={newArticle.newTopic} onChange={handleInputChange}  />
                                {errorMsg && errorMsg.for === 'topic' && errorMsg.status === 403 && newArticle.newTopic !== '' && <p className="error-msg">{errorMsg.msg}</p>}
                                {errorMsg && errorMsg.for === 'topic' && errorMsg.status === 400 && newArticle.newTopic === '' && <p className="error-msg">{errorMsg.msg}</p>}
                            </label>
                            <label>
                                Description:
                                <textarea name="description" value={newArticle.description} onChange={handleInputChange} />
                            </label>
                        </>
                    ) : newArticle.newTopic=''}
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
