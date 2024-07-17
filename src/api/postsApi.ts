import { IPost } from '../entity/post/post.slice.ts';
import axios from 'axios';

const BASE_URL = 'https://my-json-server.typicode.com/Sergey-lang/RN-test'

export const postsApi = {
    getPosts: async () => {
        const {data} = await axios.get<{
            posts: IPost[]
        }>('https://my-json-server.typicode.com/Sergey-lang/RN-test/db')
        return data;
    },
    removePost: async (id: number) => {
        return await axios.delete(`${BASE_URL}/posts/${id}`)
    },
    addPost: async (post: Omit<IPost, 'id'> ) => {
        const {data} = await axios.post<IPost>(`${BASE_URL}/posts`, post)
        return data;
    },
    updatePost: async (post: IPost) => {
        const {data} = await axios.put<IPost>(`${BASE_URL}/posts/${post.id}`, post)
        return data;
    },
}