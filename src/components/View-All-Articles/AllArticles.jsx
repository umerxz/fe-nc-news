import { useEffect, useState } from "react"
import { getAllArticles } from "../../api/api"
import { ArticlesCards } from "./ArticlesCards"
import { Navbar } from "./Navbar"
import { useContext } from 'react';
import { UserContext } from '../../context/UserProvider';
import { Link } from "react-router-dom";

export const AllArticles = () => {
    const [articlesList,setArticlesList] = useState([])
    const [errorMsg, setErrorMsg] = useState('')
    const [params,setParams] = useState({})
    let {user} = useContext(UserContext)
    
    useEffect(()=>{
        getAllArticles(params)
        .then(({articles})=>{
            setArticlesList(articles)
            setErrorMsg('')
        })
        .catch((err)=>{
            setErrorMsg(err.msg)
        })
    },[params])

    if(!user){
        return <h1 style={{fontSize:'5rem'}}>Please <Link to='/login' style={{fontSize:'5rem',textDecoration:'underline'}}> Login</Link> to gain access to NC News</h1>
    }

    return(
        <>
            <Navbar setParams={setParams} />
            {errorMsg ? <h2>Error: {errorMsg}</h2> : <ArticlesCards articlesList={articlesList} />}
        </>
    )
}