/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Textarea from '@mui/joy/Textarea';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import FormatBold from '@mui/icons-material/FormatBold';
import FormatItalic from '@mui/icons-material/FormatItalic';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Check from '@mui/icons-material/Check';
import { PostComment } from '../../api/api';
import { useContext } from 'react';
import { UserContext } from '../../context/UserProvider';
import { LoadingSpinner } from '../LoadingSpinner';

export const CommentAdder = ({setArticleComments,article_id,setIsViewAllComments}) => {
    const [italic, setItalic] = React.useState(false);
    const [fontWeight, setFontWeight] = React.useState('normal');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [newComment,setNewComment] = React.useState('')
    const [loading,setLoading] = React.useState(false)
    const [errorMsg,setErrorMsg] = React.useState('')
    let {user} = useContext(UserContext)

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)
        try{
            const newPostedComment = await PostComment(newComment,article_id,user.username)
            setNewComment('')
            setArticleComments((previousComments)=>{
                return [newPostedComment.comment,...previousComments]
            })
            setIsViewAllComments(true)
            setErrorMsg('')
            setLoading(false)
        }
        catch(err){
            setErrorMsg('Error posting comment. Please wait or try again!')
            setLoading(false)
        }
    }

    const handleChange = (event) => {
        setNewComment(event.target.value)
    }

    return (
        <form onSubmit={handleSubmit}>

            {
                loading
                ?
                <LoadingSpinner/>
                :
                <FormControl >
                    <Textarea
                        value={newComment}
                        onChange={handleChange}
                        placeholder="Type comment here…"
                        minRows={2}
                        style={{fontSize:'0.8rem'}}
                        endDecorator={
                        <Box
                            sx={{
                            display: 'flex',
                            gap: 'var(--Textarea-paddingBlock)',
                            pt: 'var(--Textarea-paddingBlock)',
                            borderTop: '1px solid',
                            borderColor: 'divider',
                            flexWrap: 'wrap',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            }}
                        >
                            <IconButton
                            variant="plain"
                            color="neutral"
                            onClick={(event) => setAnchorEl(event.currentTarget)}
                            >
                            <FormatBold />
                            <KeyboardArrowDown fontSize="md" />
                            </IconButton>
                            <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={() => setAnchorEl(null)}
                            size="sm"
                            placement="bottom-start"
                            sx={{ '--ListItemDecorator-size': '24px' }}
                            >
                            {['200', 'normal', 'bold'].map((weight) => (
                                <MenuItem
                                key={weight}
                                selected={fontWeight === weight}
                                onClick={() => {
                                    setFontWeight(weight);
                                    setAnchorEl(null);
                                }}
                                sx={{ fontWeight: weight }}
                                >
                                <ListItemDecorator>
                                    {fontWeight === weight && <Check fontSize="sm" />}
                                </ListItemDecorator>
                                {weight === '200' ? 'lighter' : weight}
                                </MenuItem>
                            ))}
                            </Menu>
                            <IconButton
                            variant={italic ? 'soft' : 'plain'}
                            color={italic ? 'primary' : 'neutral'}
                            aria-pressed={italic}
                            onClick={() => setItalic((bool) => !bool)}
                            >
                            <FormatItalic />
                            </IconButton>
                            <Button type="submit" style={{alignSelf:'flex-end'}}>Add Comment</Button>
                        </Box>
                        }
                        sx={{
                        minWidth:{ xs: 150, sm: 250, md: 300 },
                        fontWeight,
                        fontStyle: italic ? 'italic' : 'initial',
                        }}
                    />
                    {errorMsg ? <p>{errorMsg}</p> : null}
                </FormControl>
            }
        </form>
    );
}