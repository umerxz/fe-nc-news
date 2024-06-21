/* eslint-disable react/prop-types */
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getTopics } from '../../api/api';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@mui/material';

export const Filter = ({setParams}) => {
    const sortBy = [ "created_at", "votes", "comment_count" ]
    const orderBy = [ "desc","asc" ]

    const [selectedTopic, setSelectedTopic] = React.useState('')
    const [selectedSort, setSelectedSort] = React.useState('created_at')
    const [selectedOrder, setSelectedOrder] = React.useState('desc')
    const [searchParams, setSearchParams] = useSearchParams();
    const [topics, setTopics] = React.useState([]);
    const [errorMsg, setErrorMsg] = React.useState('')
    const navigate = useNavigate()

    React.useEffect(()=>{
        getTopics()
        .then(({topics})=>{
            setTopics([{ slug: 'None',description:'display all articles' }, ...topics])
        })
        .catch((err)=>{
            setErrorMsg(err.msg)
        })
    },[])
    const handleChanges = () => {
        setSelectedOrder(selectedOrder)
        setSelectedSort(selectedSort)
        const topic = selectedTopic==='None'?'':selectedTopic
        setParams({ topic:topic, order:selectedOrder, sort_by:selectedSort })
        searchParams.set('sort_by', selectedSort);
        searchParams.set('order', selectedOrder);
        setSearchParams(searchParams)
        let urlQuery = ''
        if (topic) urlQuery += `/topics/${topic}?${searchParams.toString()}`
        else urlQuery += `/articles?${searchParams.toString()}`
        navigate(urlQuery)

    }
    const handleTopicChange = (event) => {
        setSelectedTopic(event.target.value)
    };
    const handleSortChange = (event) => {
        setSelectedSort(event.target.value)
    };
    const handleOrderChange = (event) => {
        setSelectedOrder(event.target.value)
    };
    
    if(!topics) return <h1>Fetching Topics...</h1>
    
    return (
        <>
        {!errorMsg ?
            <>
                <FormControl sx={{ m: 2, minWidth: 120 }} size="small">
                    <InputLabel style={{color:'white'}} id="simple-select-label">Filter</InputLabel>
                        <Select
                            labelId="simple-select-label"
                            id="simple-select"
                            value={selectedTopic}
                            label="Filter"
                            onChange={handleTopicChange}
                            sx={{
                            color: 'white',
                            '.MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'skyblue',
                            },
                            '.MuiSelect-icon':{
                                color:'white',
                            },
                            '.MuiSelect-filled':{
                                color:'red',
                            }
                        }}
                        >
                            {topics.map((topic)=>{
                                return <MenuItem key={topic.slug} style={{color:'black'}} value={topic.slug}>{topic.slug}</MenuItem>
                            })}
                        </Select>
                </FormControl>
                <FormControl sx={{ m: 2, minWidth: 120 }} size="small">
                    <InputLabel style={{color:'white'}} id="simple-select-label">Sort</InputLabel>
                        <Select
                            labelId="simple-select-label"
                            id="simple-select"
                            value={selectedSort}
                            label="Sort"
                            onChange={handleSortChange}
                            sx={{
                            color: 'white',
                            '.MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'skyblue',
                            },
                            '.MuiSelect-icon':{
                                color:'white',
                            },
                            '.MuiSelect-filled':{
                                color:'red',
                            }
                        }}
                        >
                            {sortBy.map((sort)=>{
                                return <MenuItem key={sort} style={{color:'black'}} value={sort}>{sort}</MenuItem>
                            })}
                        </Select>
                </FormControl>
                <FormControl sx={{ m: 2, minWidth: 120 }} size="small">
                    <InputLabel style={{color:'white'}} id="simple-select-label">Order</InputLabel>
                        <Select
                            labelId="simple-select-label"
                            id="simple-select"
                            value={selectedOrder}
                            label="orderby"
                            onChange={handleOrderChange}
                            sx={{
                            color: 'white',
                            '.MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'skyblue',
                            },
                            '.MuiSelect-icon':{
                                color:'white',
                            },
                            '.MuiSelect-filled':{
                                color:'red',
                            }
                        }}
                        >
                            {orderBy.map((order)=>{
                                return <MenuItem key={order} style={{color:'black'}} value={order}>{order}</MenuItem>
                            })}
                        </Select>
                </FormControl>
                <Button 
                    color="success" sx={{ m: 2, p:1, width:'8rem' }} 
                    onClick={handleChanges} variant='contained'>Apply
                </Button>
            </>
            : <p>{errorMsg}</p>
        }
        </>
    );
}