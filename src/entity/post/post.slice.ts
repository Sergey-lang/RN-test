import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IPost {
    id: number;
    title: string;
    body: string;
}

export interface IComment {
    id: number;
    postId: number;
    text: string;
}

export interface IPostSliceSchema {
    posts: IPost[]
    comments: IComment[]
}

const initialState: IPostSliceSchema = {
    posts: [],
    comments: []
};

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPosts: (state, action: PayloadAction<IPost[]>) => {
            state.posts = action.payload;
        },
        setComments: (state, action: PayloadAction<IComment[]>) => {
            state.comments = action.payload;
        },
        addPost: (state, action: PayloadAction<IPost>) => {
            state.posts.push(action.payload)
        },
        removePost: (state, action: PayloadAction<number>) => {
            state.posts = state.posts.filter((card) => card.id !== action.payload)
        },
        updatePost: (state, action: PayloadAction<IPost>) => {
            const post = action.payload
            state.posts = state.posts.map((p) => p.id === post.id ? post : p)
        },
        // addPostComment: (state, action: PayloadAction<number>) => state + action.payload,
        // removePostComment: (state, action: PayloadAction<number>) => state + action.payload,
    },
})

export const { actions: postActions } = postSlice;
export const { reducer: postReducer } = postSlice;