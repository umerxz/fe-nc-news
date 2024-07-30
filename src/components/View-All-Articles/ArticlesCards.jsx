/* eslint-disable react/prop-types */
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import '../../styles/article-card.css'
import { Link } from 'react-router-dom';

export const ArticlesCards = ({articlesList}) => {
    return(
        <div className="card-grid">
            {articlesList.map((article)=>{
                return <Link to={`/articles/${article.article_id}`} key={article.article_id} style={{textDecoration:'none'}}>
                <Card className='post-card' sx={{ maxWidth: 345 }}>
                    <CardHeader
                        className='title-date'
                        avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            {article.author.slice(0,1).toUpperCase()}
                        </Avatar>
                        }
                        title={article.title}
                        subheader={<>
                            By {article.author} <br></br>On {new Date(article.created_at).toLocaleDateString()} <br></br>About {article.topic}
                        </>}
                        sx={{
                        ".MuiCardHeader-subheader": {
                            color: '#a2a3a2',
                            fontSize:'0.7rem'
                        }}}
                    />
                    <CardMedia
                        className='img'
                        component="img"
                        height="194"
                        image={article.article_img_url}
                        alt={`This image is about ${article.title}`}
                    />
                    <CardContent>
                        <Typography className='coments' variant="body2" color="text.secondary">
                        {article.comment_count} Comments
                        </Typography>
                        <Typography className='votes' variant="body2" color="text.secondary">
                        {article.votes} Votes
                        </Typography>
                    </CardContent>
                </Card>
                </Link>
            })}
        </div>
    )

}