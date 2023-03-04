import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_API_URL 

export const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true
})

export const getPostsPage = async (pageParam = 1, options = {}) => {
    const response = await api.get(`/posts?page=${pageParam}`, options)
    return response.data
}
