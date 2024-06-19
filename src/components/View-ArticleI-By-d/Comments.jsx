/* eslint-disable react/prop-types */
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import { Avatar, Typography } from '@mui/material';
import '../../styles/post-id.css'

export const Comments = ({articleComments}) => {

    return (
        <section className='comments'>
            <h3 className='commentsText'>Comments</h3>
            {articleComments.map((comment,index) => (
                <Card className='individualCommentBox' key={comment.comment_id ? comment.comment_id : index}
                variant="outlined"
                sx={{  borderRadius: 4, '--Card-radius': 0 }}
                >
                    <CardContent orientation="horizontal">
                        <Avatar src="https://via.placeholder.com/44" alt="Avatar image" />
                        <div style={{textAlign:'left', fontSize:'12px'}}>
                        <Typography style={{textAlign:'left', fontSize:'15px'}} variant="text" >{comment.author}</Typography>
                        <Typography style={{textAlign:'left', fontSize:'10px'}} level="body-sm" >At {new Date(comment.created_at).toLocaleTimeString()} on {new Date(comment.created_at).toLocaleDateString()}</Typography>
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