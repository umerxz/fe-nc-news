/* eslint-disable react/prop-types */
import '../../styles/article-card.css';
import { Link } from 'react-router-dom';

export const ArticlesCards = ({ articlesList }) => {
    return (
        <div className="card-grid">
            {articlesList.map((article) => (
                <Link style={{textDecoration:'none'}} to={`/articles/${article.article_id}`} key={article.article_id} className="post-card">
                    <div className="card-header">
                        <div className="avatar">{article.author.slice(0, 1).toUpperCase()}</div>
                        <div className="title-date">
                            <div className="title">{article.title}</div>
                            <div className="date">
                                By {article.author} <br />
                                On {new Date(article.created_at).toLocaleDateString()} <br />
                                About {article.topic}
                            </div>
                        </div>
                    </div>
                    <img className="img" src={article.article_img_url} alt={`This image is about ${article.title}`} />
                    <div className="card-content">
                        <div className="comments">{article.comment_count} Comments</div>
                        <div className="votes">{article.votes} Votes</div>
                    </div>
                </Link>
            ))}
        </div>
    );
};
