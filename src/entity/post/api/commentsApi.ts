import axios from 'axios';
import { IComment, IPost } from '../types';

const BASE_URL = 'https://my-json-server.typicode.com/Sergey-lang/RN-test'

export const commentsApi = {
    getComments: async () => {
        const {data} = await axios.get<{
            comments: IComment[]
        }>('https://my-json-server.typicode.com/Sergey-lang/RN-test/db')
        return data;
    },
    removeComment: async (id: number) => {
        return await axios.delete(`${BASE_URL}/comments/${id}`)
    },
    addComment: async (comment: Omit<IComment, 'id'> ) => {
        const {data} = await axios.post<IComment>(`${BASE_URL}/comments`, comment)
        return data;
    },
    updateComment: async (comment: IComment) => {
        const {data} = await axios.put<IComment>(`${BASE_URL}/comments/${comment.id}`, comment)
        return data;
    },
}