/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Card, CardContent, CardMedia, Typography, Box, IconButton } from '@mui/material';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHeartCrack, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { patchArticle, deleteArticle } from "../../api/api";
import { LoadingSpinner } from "../LoadingSpinner";
import { useNavigate } from 'react-router-dom';
import '../../styles/article-by-id.css';

export const ArticleBox = ({ article }) => {
    const [loading, setLoading] = useState(false);
    const [vote, setVote] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (article) {
            setVote(article.votes);
        }
    }, [article]);

    if (!article) {
        return <h1>Loading...</h1>;
    }

    const handleVote = (article_id, voteChange) => {
        setVote(vote => vote + voteChange);
        setLoading(true);
        patchArticle(article_id, voteChange)
            .then(() => setLoading(false))
            .catch(() => {
                setLoading(false);
                setVote(vote => vote - voteChange);
            });
    };

    const handleDeleteArticle = (article_id) => {
        setLoading(true);
        deleteArticle(article_id)
            .then(() => {
                setLoading(false);
                navigate('/articles'); 
            })
            .catch(() => {
                setLoading(false);
            });
    };

    return (
        <Card className="article-card">
            {loading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <CardMedia
                        component="img"
                        alt={`Image for ${article.title}`}
                        image={article.article_img_url}
                        className="articleImage"
                    />
                    <CardContent className="article-details">
                        <Box className="article-header">
                            <Typography variant="h5" component="div" className="articleTitle">
                                {article.title}
                            </Typography>
                            <IconButton onClick={() => handleDeleteArticle(article.article_id)} className="delete-icon">
                                <FontAwesomeIcon icon={faTrashAlt} style={{ color: '#ff2e2e' }} />
                            </IconButton>
                        </Box>
                        <Typography variant="subtitle1" color="text.secondary" className="articleSubtitle">
                            By: {article.author}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" className="articleSubtitle">
                            About: {article.topic}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" className="articleDate">
                            At {new Date(article.created_at).toLocaleTimeString()} on {new Date(article.created_at).toLocaleDateString()}
                        </Typography>
                        <Box className="vote-icons" mt={2}>
                            <IconButton onClick={() => handleVote(article.article_id, -1)} className="vote-icon">
                                <FontAwesomeIcon icon={faHeartCrack} style={{ color: '#ff2e2e' }} />
                            </IconButton>
                            <Typography variant="h6" component="span" className="vote-count">
                                {vote}
                            </Typography>
                            <IconButton onClick={() => handleVote(article.article_id, 1)} className="vote-icon">
                                <FontAwesomeIcon icon={faHeart} style={{ color: '#ff2e2e' }} />
                            </IconButton>
                        </Box>
                    </CardContent>
                </>
            )}
        </Card>
    );
};
