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
                return <Link to={`/articles/${article.article_id}`} key={article.article_id}>
                <Card className='post-card' sx={{ maxWidth: 345 }}>
                    <CardHeader
                        avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            
                        </Avatar>
                        }
                        title={article.title}
                        subheader={ article.created_at}
                    />
                    <CardMedia
                        component="img"
                        height="194"
                        image={article.article_img_url}
                        alt="Paella dish"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                        {article.comment_count} Comments
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        {article.votes} Votes
                        </Typography>
                    </CardContent>
                </Card>
                </Link>
            })}
        </div>
    )

}