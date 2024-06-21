import { useEffect, useState } from "react"
import { getAllArticles } from "../../api/api"
import { ArticlesCards } from "./ArticlesCards"
import { Navbar } from "./Navbar"
import { useContext } from 'react';
import { UserContext } from '../../context/UserProvider';
import { Link } from "react-router-dom";
import { LoadingSpinner } from "../LoadingSpinner";

export const AllArticles = () => {
    const [articlesList,setArticlesList] = useState([])
    const [errorMsg, setErrorMsg] = useState('')
    const [params,setParams] = useState({})
    const [loading,setLoading] = useState(false)
    let {user} = useContext(UserContext)
    
    useEffect(()=>{
        setLoading(true)
        getAllArticles(params)
        .then(({articles})=>{
            setArticlesList(articles)
            setErrorMsg('')
            setLoading(false)
        })
        .catch((err)=>{
            setLoading(false)
            setErrorMsg(err.msg)
        })
    },[params])

    if(!user){
        return <h1 style={{fontSize:'5rem'}}>Please <Link to='/login' style={{fontSize:'5rem',textDecoration:'underline'}}> Login</Link> to gain access to NC News</h1>
    }

    return(
        <>
            {
                loading
                ?
                <LoadingSpinner/>
                :
                <>
                    <Navbar setParams={setParams} />
                    {errorMsg ? <h2>Error: {errorMsg}</h2> : <ArticlesCards articlesList={articlesList} />}
                </>
            }
        </>
    )
}