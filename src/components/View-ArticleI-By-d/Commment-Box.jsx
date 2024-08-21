/* eslint-disable react/prop-types */
import '../../styles/article-by-id.css';
import { Comments } from './Comments';
import { CommentAdder } from './CommentAdder';

export const CommentsBox = ({ articleComments, setArticleComments, article }) => {
    return (
        <div className="comments-section">
            <div className="comments-list">
                <Comments 
                    articleComments={articleComments} 
                    setArticleComments={setArticleComments} 
                    article={article} 
                />
            </div>
            <div className="comment-adder-section">
                <CommentAdder 
                    setArticleComments={setArticleComments} 
                    article_id={article.article_id} 
                />
            </div>
        </div>
    );
};
