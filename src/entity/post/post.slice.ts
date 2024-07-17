import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IPost {
    id: number;
    title: string;
    body: string;
}

interface IComment {
    id: number;
    postId: number;
    text: string;
}

export interface IPosState {
    posts: IPost[]
    comments: IComment[]
}

const initialState: IPosState = {
    posts: [],
    comments: []
};

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        addCard: (state, action: PayloadAction<number>) => state + action.payload,
        removeCard: (state, action: PayloadAction<number>) => state + action.payload,
        addComment: (state, action: PayloadAction<number>) => state + action.payload,
        removeComment: (state, action: PayloadAction<number>) => state + action.payload,
    },
})

export const { actions: postActions } = postSlice;
export const { reducer: postReducer } = postSlice;