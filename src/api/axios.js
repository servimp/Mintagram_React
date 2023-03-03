import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
})

export const getPostsPage = async (pageParam = 1, options = {}) => {
    const response = await api.get(`/posts?page=${pageParam}`, options)
    return response.data
}
