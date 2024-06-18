/* eslint-disable react/prop-types */
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import { Avatar, Typography } from '@mui/material';
import '../../styles/post-id.css'

export const Comments = ({articleComments}) => {

    return (
        <section className='comments'>
            <h3>Comments</h3>
            {articleComments.map((comment) => (
                <Card className='individual-comment-box' key={comment.comment_id}
                variant="outlined"
                sx={{  borderRadius: 4, '--Card-radius': 0 }}
                >
                    <CardContent orientation="horizontal">
                        <Avatar src="https://via.placeholder.com/44" alt="Avatar image" />
                        <div style={{textAlign:'left', fontSize:'12px'}}>
                        <Typography style={{textAlign:'left', fontSize:'15px'}} variant="text" >{comment.author}</Typography>
                        <Typography style={{textAlign:'left', fontSize:'10px'}} level="body-sm" >{comment.created_at}</Typography>
                        </div>
                    </CardContent>
                    <CardContent sx={{ gap: 0.5 }}>
                        <Typography style={{textAlign:'left'}} variant="body2">{comment.body}</Typography>
                    </CardContent>
                </Card>
            ))}
        </section>
    )
}