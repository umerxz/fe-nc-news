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
export const getArticleById = (articleId) => {
    return ncNewsApi
    .get(`/articles/${articleId}`)
    .then(({data})=>{
        return data
    })
}
export const getArticleComments = (articleId) => {
    return ncNewsApi
    .get(`/articles/${articleId}/comments`)
    .then(({data})=>{
        return data.comments
    })
}
export const patchArticle = (article_id, newVote) => {
    return ncNewsApi
    .patch(`/articles/${article_id}`,{
        inc_votes: newVote
    })
    .then(({data})=>{
        console.log(data)
    })
}
export const PostComment = (newComment,article_id,username) => {
    console.log(newComment)
    return ncNewsApi
    .post(`/articles/${article_id}/comments`,{
        username: username,
        body: newComment
    })
    .then(({data})=>{
        return data
    })
}