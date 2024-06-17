import axios from "axios";

const ncNewsApi = axios.create({
    baseURL:"https://be-nc-news-backend-project.onrender.com/api/"
})

export const getUserByUsername = (username) => {
    return ncNewsApi
    .get(`/users/${username}`)
    .then(({data})=>{
        return data
    })
}

export const getAllArticles = () => {
    return ncNewsApi
    .get('/articles')
    .then(({data})=>{
        return data
    })
}