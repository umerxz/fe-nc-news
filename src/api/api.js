import axios from "axios";

const ncNewsApi = axios.create({
    baseURL:"https://be-nc-news-backend-project.onrender.com/api/"
})
export const getUserByUsername = (username) => {
    return ncNewsApi
    .get(`/users/${username}`)
    .then((user)=>{
        return user
    })
    .catch((err)=>{
        return Promise.reject(err.response)
    })
}
export const postUser = (newUser) => {
    return ncNewsApi
    .post(`/users/`,newUser)
    .then(({data})=>{
        return data
    })
    .catch((err)=>{
        return Promise.reject(err.response)
    })
}
export const getAllArticles = ({author,topic,sort_by,order,limit,page}) => {
    return ncNewsApi
    .get('/articles',{
        params:{
            author:author,
            topic: topic,
            sort_by: sort_by,
            order: order,
            limit: limit,
            p: page,
        }
    })
    .then(({data})=>{
        return data
    })
    .catch((err)=>{
        return Promise.reject(err.response)
    })
}
export const getArticleById = (articleId) => {
    return ncNewsApi
    .get(`/articles/${articleId}`)
    .then(({data})=>{
        return data
    })
    .catch((err)=>{
        console.log(err.response)
        return Promise.reject(err.response)
    })
}
export const getArticleComments = (articleId) => {
    return ncNewsApi
    .get(`/articles/${articleId}/comments`)
    .then(({data})=>{
        return data.comments
    })
    .catch((err)=>{
        console.log(err.response)
        return Promise.reject(err.response)
    })
}
export const updateComment = (commentId, {newVote,body}) => {
    console.log(commentId,newVote,body)
    return ncNewsApi
    .patch(`/comments/${commentId}`,{
        inc_votes: newVote,
        body: body,
    })
    .then(({data})=>{
        return data
    })
    .catch((err)=>{
        return Promise.reject(err.response)
    })
}
export const patchArticle = (article_id, newVote) => {
    return ncNewsApi
    .patch(`/articles/${article_id}`,{
        inc_votes: newVote
    })
    .then(({data})=>{
        return data
    })
    .catch((err)=>{
        return Promise.reject(err.response)
    })
}
export const PostComment = (newComment,article_id,username) => {
    return ncNewsApi
    .post(`/articles/${article_id}/comments`,{
        username: username,
        body: newComment
    })
    .then(({data})=>{
        return data
    })
}
export const deleteComment = (comment_id) => {
    return ncNewsApi
    .delete(`/comments/${comment_id}`)
    .then((res)=>{
        return res.data
    })
}
export const getTopics = () => {
    return ncNewsApi
    .get('/topics')
    .then(({data})=>{
        return data
    })
}
export const createTopic = (newTopic) => {
    return ncNewsApi
    .post(`/topics`,newTopic)
    .then(({data})=>{
        return data
    })
    .catch((err)=>{
        return Promise.reject(err.response)
    })
}
export const createArticle = (newArticle) => {
    return ncNewsApi
    .post(`/articles`,newArticle)
    .then(({data})=>{
        return data
    })
    .catch((err)=>{
        return Promise.reject(err.response)
    })
}
export const patchUser = (updatedUser) => {
    return ncNewsApi
    .patch(`/users/${updatedUser.username}`,updatedUser)
    .then(({data})=>{
        return data
    })
    .catch((err)=>{
        return Promise.reject(err.response)
    })
}

export const deleteUser = (username) => {
    return ncNewsApi
    .delete(`/users/${username}`)
    .then(()=>{
        return;
    })
}