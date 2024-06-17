import { useEffect, useState } from "react"
import { getAllArticles } from "../../api/api"
import { ArticlesCards } from "./ArticlesCards"

export const AllArticles = () => {
    const [articlesList,setArticlesList] = useState([])

    useEffect(()=>{
        getAllArticles()
        .then(({articles})=>{
            setArticlesList(articles)
        })
    },[])

    return(
        <ArticlesCards articlesList={articlesList} />
    )
}